export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string | null
          account_type: string
          balance: number | null
          bank_name: string
          created_at: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_name: string
          account_number?: string | null
          account_type: string
          balance?: number | null
          bank_name: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string | null
          account_type?: string
          balance?: number | null
          bank_name?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      fixed_deposits: {
        Row: {
          bank_name: string
          created_at: string | null
          id: string
          interest_rate: number
          maturity_amount: number | null
          maturity_date: string
          principal_amount: number
          start_date: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bank_name: string
          created_at?: string | null
          id?: string
          interest_rate: number
          maturity_amount?: number | null
          maturity_date: string
          principal_amount: number
          start_date: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bank_name?: string
          created_at?: string | null
          id?: string
          interest_rate?: number
          maturity_amount?: number | null
          maturity_date?: string
          principal_amount?: number
          start_date?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mutual_funds: {
        Row: {
          average_nav: number | null
          created_at: string | null
          current_nav: number | null
          current_value: number | null
          fund_house: string
          fund_name: string
          id: string
          invested_amount: number | null
          investment_type: string | null
          is_active: boolean | null
          scheme_code: string | null
          units: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_nav?: number | null
          created_at?: string | null
          current_nav?: number | null
          current_value?: number | null
          fund_house: string
          fund_name: string
          id?: string
          invested_amount?: number | null
          investment_type?: string | null
          is_active?: boolean | null
          scheme_code?: string | null
          units?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_nav?: number | null
          created_at?: string | null
          current_nav?: number | null
          current_value?: number | null
          fund_house?: string
          fund_name?: string
          id?: string
          invested_amount?: number | null
          investment_type?: string | null
          is_active?: boolean | null
          scheme_code?: string | null
          units?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      splitwise_data: {
        Row: {
          amount_owed: number | null
          amount_owes: number | null
          created_at: string | null
          id: string
          last_synced: string | null
          splitwise_user_id: string | null
          total_balance: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_owed?: number | null
          amount_owes?: number | null
          created_at?: string | null
          id?: string
          last_synced?: string | null
          splitwise_user_id?: string | null
          total_balance?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_owed?: number | null
          amount_owes?: number | null
          created_at?: string | null
          id?: string
          last_synced?: string | null
          splitwise_user_id?: string | null
          total_balance?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      stocks: {
        Row: {
          average_price: number | null
          company_name: string
          created_at: string | null
          current_price: number | null
          current_value: number | null
          exchange: string | null
          id: string
          invested_amount: number | null
          is_active: boolean | null
          quantity: number | null
          symbol: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_price?: number | null
          company_name: string
          created_at?: string | null
          current_price?: number | null
          current_value?: number | null
          exchange?: string | null
          id?: string
          invested_amount?: number | null
          is_active?: boolean | null
          quantity?: number | null
          symbol: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_price?: number | null
          company_name?: string
          created_at?: string | null
          current_price?: number | null
          current_value?: number | null
          exchange?: string | null
          id?: string
          invested_amount?: number | null
          is_active?: boolean | null
          quantity?: number | null
          symbol?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          created_at: string | null
          description: string
          id: string
          parsed_from_email: boolean | null
          reference_number: string | null
          source: string | null
          subcategory: string | null
          transaction_date: string
          transaction_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          category: string
          created_at?: string | null
          description: string
          id?: string
          parsed_from_email?: boolean | null
          reference_number?: string | null
          source?: string | null
          subcategory?: string | null
          transaction_date: string
          transaction_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          parsed_from_email?: boolean | null
          reference_number?: string | null
          source?: string | null
          subcategory?: string | null
          transaction_date?: string
          transaction_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "bank_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
