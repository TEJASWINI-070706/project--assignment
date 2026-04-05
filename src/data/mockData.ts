export type Role = "admin" | "viewer";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
}

export const categories = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Salary",
  "Freelance",
  "Investment",
  "Education",
];

export const transactions: Transaction[] = [
  { id: "1", date: "2025-04-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2025-04-02", description: "Grocery Store", amount: 87.50, category: "Food & Dining", type: "expense" },
  { id: "3", date: "2025-04-03", description: "Electric Bill", amount: 142.00, category: "Bills & Utilities", type: "expense" },
  { id: "4", date: "2025-04-04", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "5", date: "2025-04-05", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "6", date: "2025-04-06", description: "Gas Station", amount: 45.00, category: "Transportation", type: "expense" },
  { id: "7", date: "2025-04-07", description: "Restaurant Dinner", amount: 62.30, category: "Food & Dining", type: "expense" },
  { id: "8", date: "2025-04-08", description: "Online Course", amount: 49.99, category: "Education", type: "expense" },
  { id: "9", date: "2025-04-09", description: "Stock Dividend", amount: 320.00, category: "Investment", type: "income" },
  { id: "10", date: "2025-04-10", description: "Pharmacy", amount: 28.50, category: "Healthcare", type: "expense" },
  { id: "11", date: "2025-04-11", description: "New Shoes", amount: 89.99, category: "Shopping", type: "expense" },
  { id: "12", date: "2025-04-12", description: "Internet Bill", amount: 59.99, category: "Bills & Utilities", type: "expense" },
  { id: "13", date: "2025-04-13", description: "Coffee Shop", amount: 12.50, category: "Food & Dining", type: "expense" },
  { id: "14", date: "2025-04-14", description: "Uber Ride", amount: 22.00, category: "Transportation", type: "expense" },
  { id: "15", date: "2025-04-15", description: "Freelance Bonus", amount: 800, category: "Freelance", type: "income" },
  { id: "16", date: "2025-03-01", description: "March Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "17", date: "2025-03-05", description: "Rent Payment", amount: 1500, category: "Bills & Utilities", type: "expense" },
  { id: "18", date: "2025-03-10", description: "Gym Membership", amount: 45.00, category: "Healthcare", type: "expense" },
  { id: "19", date: "2025-03-15", description: "Book Purchase", amount: 24.99, category: "Education", type: "expense" },
  { id: "20", date: "2025-03-20", description: "Movie Tickets", amount: 32.00, category: "Entertainment", type: "expense" },
  { id: "21", date: "2025-02-01", description: "February Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "22", date: "2025-02-10", description: "Valentine Dinner", amount: 120.00, category: "Food & Dining", type: "expense" },
  { id: "23", date: "2025-02-15", description: "Car Insurance", amount: 180.00, category: "Bills & Utilities", type: "expense" },
  { id: "24", date: "2025-02-20", description: "Freelance Work", amount: 950, category: "Freelance", type: "income" },
  { id: "25", date: "2025-01-01", description: "January Salary", amount: 5200, category: "Salary", type: "income" },
];

export const monthlyData = [
  { month: "Jan", income: 5200, expenses: 2100, balance: 3100 },
  { month: "Feb", income: 6150, expenses: 2450, balance: 3700 },
  { month: "Mar", income: 5200, expenses: 2800, balance: 2400 },
  { month: "Apr", income: 7520, expenses: 1850, balance: 5670 },
];

export const chatbotResponses: Record<string, string> = {
  greeting: "👋 Welcome to FinanceFlow! I'm your financial assistant. Ask me anything about using the dashboard.",
  overview: "The **Dashboard Overview** shows your financial summary at a glance:\n- **Summary Cards**: Total balance, income, and expenses\n- **Balance Trend Chart**: Tracks your balance over months\n- **Spending Breakdown**: Pie chart of expenses by category",
  transactions: "The **Transactions** section lets you:\n- 📋 View all transactions with date, amount, category & type\n- 🔍 Search by description\n- 🗂️ Filter by type (income/expense) or category\n- ↕️ Sort by date or amount\n- ➕ Add new transactions (Admin role only)",
  roles: "**Role-Based Access**:\n- 👀 **Viewer**: Can view all data but cannot add or edit transactions\n- 🛡️ **Admin**: Full access including adding and editing transactions\n\nSwitch roles using the dropdown in the top navigation bar.",
  insights: "The **Insights** section shows:\n- 📊 Your highest spending category\n- 📈 Month-over-month comparison\n- 💡 Smart observations about your spending patterns",
  help: "Here's what I can help with:\n- `overview` — Dashboard overview\n- `transactions` — Transaction features\n- `roles` — Role-based access\n- `insights` — Financial insights\n- `filters` — How to filter data\n- `export` — Export functionality",
  filters: "**Filtering & Sorting**:\n1. Use the search bar to find transactions by description\n2. Filter by type: All, Income, or Expense\n3. Filter by category using the dropdown\n4. Sort by date (newest/oldest) or amount (high/low)",
  export: "**Export Options** (Admin only):\n- Click the export button to download your transactions as CSV\n- Data includes date, description, amount, category, and type",
  default: "I'm not sure I understand. Try asking about:\n- `overview`, `transactions`, `roles`, `insights`, `filters`, or `export`\n\nOr just say **help** to see all topics!",
};
