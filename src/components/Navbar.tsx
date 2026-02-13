import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, User, LogOut, Menu, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import NotificationsDropdown from "@/components/NotificationsDropdown";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "admin") return "/admin";
    if (user.role === "seller") return "/seller";
    return "/buyer";
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <span className="text-xl font-display font-bold text-gradient">TradeHub</span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search products, suppliers, categories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
          </div>
        </form>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/products">
            <Button variant="ghost" size="sm">Products</Button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/chat">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <MessageSquare className="h-4 w-4" /> Chat
                </Button>
              </Link>
              <NotificationsDropdown />
              <Link to={getDashboardLink()}>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <User className="h-4 w-4" /> {user?.name}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/signup"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>

        <Button variant="ghost" size="sm" className="md:hidden ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3 animate-fade-in">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-input bg-background py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </form>
          <Link to="/products" className="block" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Products</Button>
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="block" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2"><MessageSquare className="h-4 w-4" />Chat</Button>
              </Link>
              <Link to={getDashboardLink()} className="block" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start gap-2"><User className="h-4 w-4" />{user?.name} Dashboard</Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => { handleLogout(); setMobileOpen(false); }}>
                <LogOut className="h-4 w-4" />Logout
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
