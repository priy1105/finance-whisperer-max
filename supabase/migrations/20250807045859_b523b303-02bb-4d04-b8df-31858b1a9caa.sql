-- Enable RLS on auth.users for profiles
-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create bank accounts table
CREATE TABLE public.bank_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  account_number TEXT,
  bank_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('savings', 'current', 'salary')),
  balance DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create fixed deposits table
CREATE TABLE public.fixed_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  principal_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  maturity_amount DECIMAL(15,2),
  start_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'matured', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create mutual funds table
CREATE TABLE public.mutual_funds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  fund_name TEXT NOT NULL,
  fund_house TEXT NOT NULL,
  scheme_code TEXT,
  investment_type TEXT CHECK (investment_type IN ('sip', 'lumpsum')),
  units DECIMAL(15,6) DEFAULT 0,
  average_nav DECIMAL(10,4),
  current_nav DECIMAL(10,4),
  invested_amount DECIMAL(15,2) DEFAULT 0,
  current_value DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stocks table
CREATE TABLE public.stocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  company_name TEXT NOT NULL,
  exchange TEXT DEFAULT 'NSE',
  quantity INTEGER DEFAULT 0,
  average_price DECIMAL(10,2),
  current_price DECIMAL(10,2),
  invested_amount DECIMAL(15,2) DEFAULT 0,
  current_value DECIMAL(15,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create transactions table (enhanced)
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.bank_accounts(id),
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense', 'transfer', 'investment')),
  category TEXT NOT NULL,
  subcategory TEXT,
  transaction_date DATE NOT NULL,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'gmail', 'api', 'splitwise')),
  reference_number TEXT,
  parsed_from_email BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create splitwise integration table
CREATE TABLE public.splitwise_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  splitwise_user_id TEXT,
  total_balance DECIMAL(15,2) DEFAULT 0,
  amount_owed DECIMAL(15,2) DEFAULT 0,
  amount_owes DECIMAL(15,2) DEFAULT 0,
  last_synced TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fixed_deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mutual_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.splitwise_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for bank accounts
CREATE POLICY "Users can view their own bank accounts" ON public.bank_accounts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own bank accounts" ON public.bank_accounts
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for fixed deposits
CREATE POLICY "Users can view their own FDs" ON public.fixed_deposits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own FDs" ON public.fixed_deposits
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for mutual funds
CREATE POLICY "Users can view their own mutual funds" ON public.mutual_funds
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own mutual funds" ON public.mutual_funds
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for stocks
CREATE POLICY "Users can view their own stocks" ON public.stocks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own stocks" ON public.stocks
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own transactions" ON public.transactions
  FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for splitwise data
CREATE POLICY "Users can view their own splitwise data" ON public.splitwise_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own splitwise data" ON public.splitwise_data
  FOR ALL USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at
  BEFORE UPDATE ON public.bank_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fixed_deposits_updated_at
  BEFORE UPDATE ON public.fixed_deposits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mutual_funds_updated_at
  BEFORE UPDATE ON public.mutual_funds
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_stocks_updated_at
  BEFORE UPDATE ON public.stocks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_splitwise_data_updated_at
  BEFORE UPDATE ON public.splitwise_data
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();