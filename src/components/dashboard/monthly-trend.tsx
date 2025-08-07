import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface MonthlyData {
  month: string
  income: number
  expenses: number
  savings: number
}

interface MonthlyTrendProps {
  data: MonthlyData[]
}

export function MonthlyTrend({ data }: MonthlyTrendProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const maxAmount = Math.max(...data.flatMap(d => [d.income, d.expenses]))

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle>Monthly Trend</CardTitle>
        <CardDescription>Income vs Expenses over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {data.map((month, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{month.month}</span>
                <div className="text-sm space-x-4">
                  <span className="text-income">↗ {formatCurrency(month.income)}</span>
                  <span className="text-expense">↘ {formatCurrency(month.expenses)}</span>
                </div>
              </div>
              
              {/* Visual bars */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-12 text-xs text-muted-foreground">Income</div>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-success transition-all duration-500"
                      style={{ width: `${(month.income / maxAmount) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 text-xs text-muted-foreground">Expense</div>
                  <div className="flex-1 bg-muted rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-danger transition-all duration-500"
                      style={{ width: `${(month.expenses / maxAmount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-medium ${month.savings >= 0 ? 'text-success' : 'text-destructive'}`}>
                  Net: {formatCurrency(month.savings)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}