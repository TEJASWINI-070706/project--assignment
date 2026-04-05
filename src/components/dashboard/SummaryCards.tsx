import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const SummaryCards = () => {
  const { transactions } = useApp();

  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const totalExpenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    return { totalIncome, totalExpenses, balance: totalIncome - totalExpenses };
  }, [transactions]);

  const cards = [
    { label: "Total Balance", value: balance, icon: Wallet, color: "primary" },
    { label: "Total Income", value: totalIncome, icon: TrendingUp, color: "success" },
    { label: "Total Expenses", value: totalExpenses, icon: TrendingDown, color: "destructive" },
    { label: "Transactions", value: transactions.length, icon: DollarSign, color: "warning", isCount: true },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className="glass-card p-5 animate-slide-up group hover:glow-primary transition-all duration-300"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground font-medium">{card.label}</span>
            <div className={`p-2 rounded-lg bg-${card.color}/10`}>
              <card.icon className={`w-4 h-4 text-${card.color}`} />
            </div>
          </div>
          <p className="text-2xl font-bold tracking-tight">
            {card.isCount ? card.value : `$${card.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
