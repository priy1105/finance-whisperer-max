import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const metricCardVariants = cva(
  "relative p-6 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-elegant",
  {
    variants: {
      variant: {
        default: "bg-gradient-card border-border",
        success: "bg-gradient-success text-success-foreground border-success/20 shadow-success",
        warning: "bg-gradient-warning text-warning-foreground border-warning/20 shadow-warning",
        danger: "bg-gradient-danger text-destructive-foreground border-destructive/20 shadow-danger",
        income: "bg-gradient-success text-success-foreground border-success/20 shadow-success",
        expense: "bg-gradient-danger text-destructive-foreground border-destructive/20 shadow-danger"
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string
  value: string | number
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  icon?: React.ReactNode
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, variant, size, title, value, subtitle, trend, trendValue, icon, ...props }, ref) => {
    return (
      <div
        className={cn(metricCardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {subtitle && (
              <p className="text-sm opacity-70">{subtitle}</p>
            )}
            {trend && trendValue && (
              <div className={cn(
                "flex items-center space-x-1 text-xs font-medium",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive",
                trend === "neutral" && "text-muted-foreground"
              )}>
                <span>{trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}</span>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="opacity-80">
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"

export { MetricCard, metricCardVariants }