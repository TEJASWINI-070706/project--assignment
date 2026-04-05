import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/dashboard/Navbar";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceTrendChart from "@/components/dashboard/BalanceTrendChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsPanel from "@/components/dashboard/InsightsPanel";
import Chatbot from "@/components/dashboard/Chatbot";

const Index = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceTrendChart />
            </div>
            <SpendingBreakdown />
          </div>
          <TransactionsTable />
          <InsightsPanel />
        </main>
        <Chatbot />
      </div>
    </AppProvider>
  );
};

export default Index;
