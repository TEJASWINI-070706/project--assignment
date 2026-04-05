import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyData } from "@/data/mockData";

const BalanceTrendChart = () => {
  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Balance Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData}>
            <defs>
              <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 16%)" />
            <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{
                background: "hsl(222, 47%, 9%)",
                border: "1px solid hsl(222, 30%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 96%)",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Area type="monotone" dataKey="income" stroke="hsl(142, 71%, 45%)" fill="url(#incomeGrad)" strokeWidth={2} name="Income" />
            <Area type="monotone" dataKey="balance" stroke="hsl(217, 91%, 60%)" fill="url(#balanceGrad)" strokeWidth={2} name="Balance" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceTrendChart;
