import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { categories, Transaction } from "@/data/mockData";
import { Search, Plus, ArrowUpDown, Trash2, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const TransactionsTable = () => {
  const { role, filteredTransactions, filters, setFilters, addTransaction, deleteTransaction } = useApp();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ description: "", amount: "", category: "Food & Dining", type: "expense" as "income" | "expense", date: new Date().toISOString().split("T")[0] });

  const handleAdd = () => {
    if (!form.description || !form.amount) { toast.error("Please fill all fields"); return; }
    addTransaction({ ...form, amount: parseFloat(form.amount), date: form.date });
    toast.success("Transaction added!");
    setOpen(false);
    setForm({ description: "", amount: "", category: "Food & Dining", type: "expense", date: new Date().toISOString().split("T")[0] });
  };

  const handleExport = () => {
    const csv = ["Date,Description,Amount,Category,Type", ...filteredTransactions.map((t) => `${t.date},${t.description},${t.amount},${t.category},${t.type}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as CSV!");
  };

  return (
    <div className="glass-card p-5 animate-slide-up" style={{ animationDelay: "400ms" }}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <h3 className="text-sm font-semibold text-muted-foreground">Transactions</h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {role === "admin" && (
            <>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1"><Plus className="w-3.5 h-3.5" /> Add</Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader><DialogTitle>Add Transaction</DialogTitle></DialogHeader>
                  <div className="space-y-3 pt-2">
                    <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                    <div><Label>Description</Label><Input placeholder="e.g. Coffee" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                    <div><Label>Amount ($)</Label><Input type="number" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Type</Label>
                        <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as "income" | "expense" })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
                        </Select>
                      </div>
                      <div><Label>Category</Label>
                        <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full" onClick={handleAdd}>Add Transaction</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button size="sm" variant="outline" className="gap-1" onClick={handleExport}><Download className="w-3.5 h-3.5" /> Export</Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search transactions..." className="pl-9 bg-secondary/50 border-border" value={filters.search} onChange={(e) => setFilters({ search: e.target.value })} />
        </div>
        <Select value={filters.type} onValueChange={(v) => setFilters({ type: v as any })}>
          <SelectTrigger className="w-full sm:w-[140px] bg-secondary/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.category} onValueChange={(v) => setFilters({ category: v })}>
          <SelectTrigger className="w-full sm:w-[160px] bg-secondary/50"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filters.sortBy} onValueChange={(v) => setFilters({ sortBy: v as any })}>
          <SelectTrigger className="w-full sm:w-[160px] bg-secondary/50"><ArrowUpDown className="w-3.5 h-3.5 mr-1" /><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="amount-desc">Highest Amount</SelectItem>
            <SelectItem value="amount-asc">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium">Description</th>
                <th className="text-left py-3 px-2 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
                <th className="text-right py-3 px-2 text-muted-foreground font-medium">Amount</th>
                {role === "admin" && <th className="text-right py-3 px-2 text-muted-foreground font-medium w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-3 px-2 text-muted-foreground">{new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                  <td className="py-3 px-2 font-medium">{t.description}</td>
                  <td className="py-3 px-2 hidden sm:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">{t.category}</span>
                  </td>
                  <td className={`py-3 px-2 text-right font-semibold ${t.type === "income" ? "text-success" : "text-destructive"}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toFixed(2)}
                  </td>
                  {role === "admin" && (
                    <td className="py-3 px-2 text-right">
                      <button onClick={() => { deleteTransaction(t.id); toast.success("Deleted"); }} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
