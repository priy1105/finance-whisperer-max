import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: "income" | "expense"
  category: string
  source: string
}

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryVariant = (category: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Food & Dining": "default",
      "Transportation": "secondary",
      "Shopping": "destructive",
      "Entertainment": "outline",
      "Bills": "secondary",
      "Salary": "default",
      "Investment": "secondary"
    }
    return variants[category] || "default"
  }

  return (
    <div className="rounded-xl border bg-card shadow-elegant">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <p className="text-sm text-muted-foreground">Your latest financial activity</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant={getCategoryVariant(transaction.category)}>
                  {transaction.category}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {transaction.source}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={cn(
                    "font-semibold",
                    transaction.type === "income" 
                      ? "text-income" 
                      : "text-expense"
                  )}
                >
                  {transaction.type === "expense" ? "-" : "+"}
                  {formatCurrency(transaction.amount)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}