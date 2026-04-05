import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { monthlyData } from "@/data/mockData";
import { TrendingUp, TrendingDown, AlertTriangle, Lightbulb } from "lucide-react";

const InsightsPanel = () => {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const catMap: Record<string, number> = {};
    expenses.forEach((t) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const topCategory = sorted[0];

    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const expenseChange = previous ? ((current.expenses - previous.expenses) / previous.expenses * 100) : 0;
    const incomeChange = previous ? ((current.income - previous.income) / previous.income * 100) : 0;

    const savingsRate = current.income > 0 ? ((current.balance / current.income) * 100) : 0;

    return { topCategory, expenseChange, incomeChange, savingsRate, totalCategories: sorted.length };
  }, [transactions]);

  const cards = [
    {
      icon: AlertTriangle,
      title: "Highest Spending",
      value: insights.topCategory ? `${insights.topCategory[0]}` : "N/A",
      sub: insights.topCategory ? `$${insights.topCategory[1].toFixed(2)} total` : "",
      color: "text-warning",
    },
    {
      icon: insights.expenseChange <= 0 ? TrendingDown : TrendingUp,
      title: "Expense Trend",
      value: `${insights.expenseChange > 0 ? "+" : ""}${insights.expenseChange.toFixed(0)}%`,
      sub: "vs last month",
      color: insights.expenseChange <= 0 ? "text-success" : "text-destructive",
    },
    {
      icon: TrendingUp,
      title: "Income Trend",
      value: `${insights.incomeChange > 0 ? "+" : ""}${insights.incomeChange.toFixed(0)}%`,
      sub: "vs last month",
      color: insights.incomeChange >= 0 ? "text-success" : "text-destructive",
    },
    {
      icon: Lightbulb,
      title: "Savings Rate",
      value: `${insights.savingsRate.toFixed(0)}%`,
      sub: "of income saved",
      color: insights.savingsRate >= 20 ? "text-success" : "text-warning",
    },
  ];

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Financial Insights</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.title} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <card.icon className={`w-5 h-5 mt-0.5 ${card.color}`} />
            <div>
              <p className="text-xs text-muted-foreground">{card.title}</p>
              <p className="text-lg font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;
