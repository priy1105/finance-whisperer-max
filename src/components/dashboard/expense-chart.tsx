import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExpenseData {
  category: string
  amount: number
  percentage: number
  color: string
}

interface ExpenseChartProps {
  data: ExpenseData[]
}

export function ExpenseChart({ data }: ExpenseChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="shadow-elegant">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>Your spending by category this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium">{item.category}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatCurrency(item.amount)}</div>
                <div className="text-sm text-muted-foreground">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center font-semibold">
            <span>Total Expenses</span>
            <span className="text-lg">{formatCurrency(total)}</span>
          </div>
        </div>
        
        {/* Simple visual bar chart */}
        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span>{item.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}