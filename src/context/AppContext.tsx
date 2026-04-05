import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Transaction, Role, transactions as initialTransactions } from "@/data/mockData";

interface Filters {
  search: string;
  type: "all" | "income" | "expense";
  category: string;
  sortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
}

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  filteredTransactions: Transaction[];
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("admin");
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filters, setFiltersState] = useState<Filters>({
    search: "",
    type: "all",
    category: "all",
    sortBy: "date-desc",
  });

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...t, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(s));
    }
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }
    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }
    switch (filters.sortBy) {
      case "date-desc": result.sort((a, b) => b.date.localeCompare(a.date)); break;
      case "date-asc": result.sort((a, b) => a.date.localeCompare(b.date)); break;
      case "amount-desc": result.sort((a, b) => b.amount - a.amount); break;
      case "amount-asc": result.sort((a, b) => a.amount - b.amount); break;
    }
    return result;
  }, [transactions, filters]);

  return (
    <AppContext.Provider value={{ role, setRole, transactions, addTransaction, deleteTransaction, filters, setFilters, filteredTransactions }}>
      {children}
    </AppContext.Provider>
  );
};
