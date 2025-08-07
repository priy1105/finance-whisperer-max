import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { TransactionTable } from "@/components/dashboard/transaction-table"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { MonthlyTrend } from "@/components/dashboard/monthly-trend"
import { Button } from "@/components/ui/button"
import { Plus, Download, Settings } from "lucide-react"

// Mock data for demonstration
const mockTransactions = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Grocery Shopping - Reliance Fresh",
    amount: 2500,
    type: "expense" as const,
    category: "Food & Dining",
    source: "Credit Card"
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Salary Credit",
    amount: 75000,
    type: "income" as const,
    category: "Salary",
    source: "Bank Transfer"
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Uber Ride to Office",
    amount: 450,
    type: "expense" as const,
    category: "Transportation",
    source: "Debit Card"
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Netflix Subscription",
    amount: 649,
    type: "expense" as const,
    category: "Entertainment",
    source: "Credit Card"
  },
  {
    id: "5",
    date: "2024-01-11",
    description: "Online Shopping - Amazon",
    amount: 3200,
    type: "expense" as const,
    category: "Shopping",
    source: "Credit Card"
  }
]

const mockExpenseData = [
  { category: "Food & Dining", amount: 12500, percentage: 35, color: "#ef4444" },
  { category: "Transportation", amount: 8000, percentage: 22, color: "#f97316" },
  { category: "Shopping", amount: 6500, percentage: 18, color: "#eab308" },
  { category: "Entertainment", amount: 4500, percentage: 13, color: "#22c55e" },
  { category: "Bills", amount: 4200, percentage: 12, color: "#3b82f6" }
]

const mockMonthlyData = [
  { month: "Aug 2023", income: 75000, expenses: 45000, savings: 30000 },
  { month: "Sep 2023", income: 75000, expenses: 52000, savings: 23000 },
  { month: "Oct 2023", income: 80000, expenses: 48000, savings: 32000 },
  { month: "Nov 2023", income: 75000, expenses: 55000, savings: 20000 },
  { month: "Dec 2023", income: 85000, expenses: 62000, savings: 23000 },
  { month: "Jan 2024", income: 75000, expenses: 35700, savings: 39300 }
]

export default function Dashboard() {
  const totalIncome = 75000
  const totalExpenses = 35700
  const netSavings = totalIncome - totalExpenses
  const monthlyChange = 18.5

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Finance Dashboard</h1>
              <p className="text-muted-foreground">Track your income, expenses, and savings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Financial Overview */}
        <section>
          <FinancialOverview
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            netSavings={netSavings}
            monthlyChange={monthlyChange}
          />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ExpenseChart data={mockExpenseData} />
          <MonthlyTrend data={mockMonthlyData} />
        </section>

        {/* Transactions Table */}
        <section>
          <TransactionTable transactions={mockTransactions} />
        </section>
      </div>
    </div>
  )
}