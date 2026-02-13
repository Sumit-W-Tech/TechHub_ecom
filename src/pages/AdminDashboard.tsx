import { useState } from "react";
import { users, products, inquiries } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Users, Package, MessageSquare, BarChart3, CheckCircle, XCircle, Shield } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "products" | "inquiries">("overview");

  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "text-primary" },
    { label: "Products", value: products.length, icon: Package, color: "text-info" },
    { label: "Inquiries", value: inquiries.length, icon: MessageSquare, color: "text-warning" },
    { label: "Revenue", value: "$12.4K", icon: BarChart3, color: "text-success" },
  ];

  const tabs = [
    { key: "overview" as const, label: "Overview", icon: BarChart3 },
    { key: "users" as const, label: "Users", icon: Users },
    { key: "products" as const, label: "Products", icon: Package },
    { key: "inquiries" as const, label: "Inquiries", icon: MessageSquare },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-display font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Manage your marketplace</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit flex-wrap">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.key ? "bg-card shadow-sm" : "text-muted-foreground"}`}>
            <tab.icon className="h-4 w-4" />{tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Recent Inquiries</h3>
            <div className="space-y-3">
              {inquiries.slice(0, 3).map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{inq.productName}</p>
                    <p className="text-xs text-muted-foreground">{inq.buyerName}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${inq.status === "pending" ? "bg-warning/10 text-warning" : inq.status === "contacted" ? "bg-info/10 text-info" : "bg-success/10 text-success"}`}>{inq.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-semibold mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              {users.filter((u) => u.status === "pending").map((u) => (
                <div key={u.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email} · {u.role}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => toast.success("Approved!")}><CheckCircle className="h-3.5 w-3.5 text-success" /></Button>
                    <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => toast.success("Blocked")}><XCircle className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-muted/50"><th className="text-left text-xs font-medium text-muted-foreground p-3">Name</th><th className="text-left text-xs font-medium text-muted-foreground p-3">Email</th><th className="text-left text-xs font-medium text-muted-foreground p-3">Role</th><th className="text-left text-xs font-medium text-muted-foreground p-3">Status</th><th className="text-left text-xs font-medium text-muted-foreground p-3">Actions</th></tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0">
                  <td className="p-3 text-sm font-medium">{u.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{u.email}</td>
                  <td className="p-3"><span className="text-xs font-medium capitalize bg-muted px-2 py-0.5 rounded">{u.role}</span></td>
                  <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-success/10 text-success" : u.status === "blocked" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning"}`}>{u.status}</span></td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      {u.status !== "active" && <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Approved")}>Approve</Button>}
                      {u.status !== "blocked" && <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={() => toast.success("Blocked")}>Block</Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.sellerName} · {p.category} · ${p.price}/unit</p>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={() => toast.success("Product removed")}>Remove</Button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "inquiries" && (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div key={inq.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{inq.productName}</h3>
                  <p className="text-xs text-muted-foreground">Buyer: {inq.buyerName} · Qty: {inq.quantity}</p>
                  <p className="text-sm text-muted-foreground mt-1">{inq.message}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${inq.status === "pending" ? "bg-warning/10 text-warning" : inq.status === "contacted" ? "bg-info/10 text-info" : "bg-success/10 text-success"}`}>{inq.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
