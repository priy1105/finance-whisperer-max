import { MetricCard } from "@/components/ui/metric-card"
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from "lucide-react"

interface FinancialOverviewProps {
  totalIncome: number
  totalExpenses: number
  netSavings: number
  monthlyChange: number
}

export function FinancialOverview({ totalIncome, totalExpenses, netSavings, monthlyChange }: FinancialOverviewProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        variant="income"
        title="Total Income"
        value={formatCurrency(totalIncome)}
        trend="up"
        trendValue="+12.5% from last month"
        icon={<TrendingUp className="h-8 w-8" />}
      />
      
      <MetricCard
        variant="expense"
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        trend="down"
        trendValue="-5.2% from last month"
        icon={<TrendingDown className="h-8 w-8" />}
      />
      
      <MetricCard
        variant={netSavings >= 0 ? "success" : "danger"}
        title="Net Savings"
        value={formatCurrency(netSavings)}
        trend={netSavings >= 0 ? "up" : "down"}
        trendValue={`${netSavings >= 0 ? "+" : ""}${monthlyChange}% this month`}
        icon={<PiggyBank className="h-8 w-8" />}
      />
      
      <MetricCard
        variant="default"
        title="Available Balance"
        value={formatCurrency(45000)}
        subtitle="Across all accounts"
        icon={<DollarSign className="h-8 w-8" />}
      />
    </div>
  )
}