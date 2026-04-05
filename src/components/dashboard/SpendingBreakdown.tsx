import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useApp } from "@/context/AppContext";

const COLORS = [
  "hsl(217, 91%, 60%)",
  "hsl(280, 65%, 60%)",
  "hsl(38, 92%, 50%)",
  "hsl(142, 71%, 45%)",
  "hsl(0, 72%, 51%)",
  "hsl(190, 80%, 50%)",
  "hsl(330, 65%, 55%)",
];

const SpendingBreakdown = () => {
  const { transactions } = useApp();

  const data = useMemo(() => {
    const map: Record<string, number> = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "300ms" }}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Spending Breakdown</h3>
      <div className="flex flex-col items-center">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(222, 47%, 9%)",
                  border: "1px solid hsl(222, 30%, 16%)",
                  borderRadius: "8px",
                  color: "hsl(210, 40%, 96%)",
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full space-y-2 mt-2">
          {data.slice(0, 5).map((item, i) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">{((item.value / total) * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
