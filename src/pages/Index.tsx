import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, PieChart, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Master Your Money
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take control of your financial future with our comprehensive personal finance dashboard. 
            Track expenses, monitor income, and achieve your savings goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                View Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border shadow-elegant hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-success rounded-xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-success-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Get detailed insights into your spending patterns with interactive charts and trends.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border shadow-elegant hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-warning rounded-xl flex items-center justify-center mx-auto mb-4">
              <PieChart className="h-8 w-8 text-warning-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Category Tracking</h3>
            <p className="text-muted-foreground">
              Automatically categorize your expenses and see where your money goes each month.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border shadow-elegant hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Goal Planning</h3>
            <p className="text-muted-foreground">
              Set savings goals and track your progress with visual indicators and milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
