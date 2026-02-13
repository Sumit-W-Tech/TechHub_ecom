import { useState } from "react";
import { products, inquiries } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Plus, Package, MessageSquare, TrendingUp, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

const SellerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "inquiries" | "add">("products");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", category: "Electronics", color: "", minOrder: "" });

  const sellerProducts = products.slice(0, 4);
  const sellerInquiries = inquiries.slice(0, 4);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Product added successfully!");
    setActiveTab("products");
    setNewProduct({ name: "", price: "", description: "", category: "Electronics", color: "", minOrder: "" });
  };

  const stats = [
    { label: "Total Products", value: sellerProducts.length, icon: Package, color: "text-primary" },
    { label: "Active Inquiries", value: sellerInquiries.filter((i) => i.status === "pending").length, icon: MessageSquare, color: "text-info" },
    { label: "Total Views", value: "1.2K", icon: Eye, color: "text-success" },
    { label: "Conversion", value: "8.5%", icon: TrendingUp, color: "text-warning" },
  ];

  const tabs = [
    { key: "products" as const, label: "My Products", icon: Package },
    { key: "inquiries" as const, label: "Inquiries", icon: MessageSquare },
    { key: "add" as const, label: "Add Product", icon: Plus },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Seller Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user?.name || "Seller"}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />{tab.label}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {activeTab === "products" && (
        <div className="space-y-3">
          {sellerProducts.map((p) => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
              <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center text-2xl shrink-0">
                {p.category === "Electronics" ? "💻" : p.category === "Machinery" ? "⚙️" : "🏷️"}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{p.name}</h3>
                <p className="text-sm text-primary font-medium">${p.price}/unit</p>
                <p className="text-xs text-muted-foreground">{p.category} · Min: {p.minOrder} units</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0"><Edit className="h-3.5 w-3.5" /></Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inquiries Tab */}
      {activeTab === "inquiries" && (
        <div className="space-y-3">
          {sellerInquiries.map((inq) => (
            <div key={inq.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-sm">{inq.productName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">From: {inq.buyerName} · {inq.buyerEmail}</p>
                  <p className="text-sm text-muted-foreground mt-2">{inq.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">Qty: {inq.quantity} · {inq.createdAt}</p>
                </div>
                <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                  inq.status === "pending" ? "bg-warning/10 text-warning" :
                  inq.status === "contacted" ? "bg-info/10 text-info" :
                  "bg-success/10 text-success"
                }`}>
                  {inq.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Tab */}
      {activeTab === "add" && (
        <div className="max-w-lg">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-display font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Product Name</label>
                <input required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Price ($/unit)</label>
                  <input required type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Min. Order</label>
                  <input required type="number" value={newProduct.minOrder} onChange={(e) => setNewProduct({ ...newProduct, minOrder: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Category</label>
                  <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {["Electronics", "Machinery", "Textiles", "Chemicals", "Agriculture", "Construction", "Auto Parts", "Packaging"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Color</label>
                  <input value={newProduct.color} onChange={(e) => setNewProduct({ ...newProduct, color: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Description</label>
                <textarea required rows={3} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              </div>
              <Button type="submit" className="w-full font-semibold" size="lg">Add Product</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
