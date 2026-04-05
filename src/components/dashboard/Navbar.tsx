import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Shield, Eye, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Role } from "@/data/mockData";

const Navbar = () => {
  const { role, setRole } = useApp();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 glass-card rounded-none border-x-0 border-t-0 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-bold gradient-text">FinanceFlow</h1>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-xs text-muted-foreground hidden sm:inline truncate max-w-[150px]">
              {user.email}
            </span>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {role === "admin" ? <Shield className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
            <span className="hidden sm:inline">Role:</span>
          </div>
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className="w-[120px] bg-secondary/50 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Log out">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
