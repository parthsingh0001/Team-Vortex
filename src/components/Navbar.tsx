import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, LayoutDashboard, Bell, Users, Menu, X, LogIn, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/", label: "Events", icon: Calendar },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/teams", label: "Teams", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unreadCount = mockNotifications.filter((n) => !n.read).length;
  const { user, role, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">W</span>
          </div>
          <span className="font-bold text-lg text-foreground">
            Web<span className="text-primary">Track</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link key={item.to} to={item.to}>
                <Button
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className="relative gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                  {item.label === "Notifications" && unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            );
          })}

          {/* Auth button */}
          {user ? (
            <div className="flex items-center gap-2 ml-2">
              {role === "admin" && (
                <Badge variant="outline" className="text-primary border-primary/50 gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </Badge>
              )}
              <span className="text-sm text-muted-foreground truncate max-w-[120px]">
                {user.email}
              </span>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-1">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/auth" className="ml-2">
              <Button size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass border-b border-border/50 px-4 pb-4"
        >
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2 mb-1">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          ))}
          {user ? (
            <>
              {role === "admin" && (
                <Badge variant="outline" className="text-primary border-primary/50 gap-1 mb-2">
                  <Shield className="w-3 h-3" />
                  Admin
                </Badge>
              )}
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { setMobileOpen(false); handleSignOut(); }}>
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setMobileOpen(false)}>
              <Button className="w-full gap-2 mt-1">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
