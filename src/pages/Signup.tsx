import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  try {
    setSubmitting(true);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      }
    );

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Registration failed");
      return;
    }

    // Save token
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));

    toast.success("Account created successfully!");
    navigate("/");

  } catch (error) {
    toast.error("Server error");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <ShoppingBag className="h-10 w-10 text-primary mx-auto mb-3" />
          <h1 className="text-2xl font-display font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join TradeHub as a buyer or seller</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">I want to</label>
              <div className="grid grid-cols-2 gap-2">
                {(["buyer", "seller"] as const).map((r) => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className={`py-2.5 rounded-lg text-sm font-medium transition-colors ${role === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                    {r === "buyer" ? "🛒 Buy Products" : "🏪 Sell Products"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{role === "seller" ? "Business Name" : "Full Name"}</label>
              <input required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder={role === "seller" ? "Your Company Name" : "John Doe"} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@company.com" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input required type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Min. 6 characters" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full font-semibold" size="lg" disabled={submitting}>
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
            </Button>
          </form>
          <p className="text-sm text-center text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
