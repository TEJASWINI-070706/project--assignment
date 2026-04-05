import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, TrendingUp, Shield, BarChart3 } from "lucide-react";

const features = [
  { icon: BarChart3, title: "Financial Overview", desc: "Track your balance, income, and expenses at a glance" },
  { icon: TrendingUp, title: "Spending Insights", desc: "Understand your spending patterns with smart analytics" },
  { icon: Shield, title: "Role-Based Access", desc: "Admin and viewer roles for secure data management" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">FinanceFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 max-w-2xl leading-tight">
          Take Control of Your <span className="text-primary">Finances</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mb-8">
          A simple, powerful dashboard to track transactions, analyze spending, and gain financial insights.
        </p>
        <div className="flex gap-3 mb-16">
          <Link to="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="lg">Log in</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-card p-6 text-left">
              <f.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
