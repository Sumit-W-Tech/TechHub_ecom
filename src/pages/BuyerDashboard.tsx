import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { MessageSquare, Heart, Clock, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

interface Inquiry {
  _id: string;
  product: Product;
  message: string;
  quantity: number;
  status: string;
  createdAt: string;
}

const BuyerDashboard = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"inquiries" | "favorites">("inquiries");

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [stats, setStats] = useState({
    inquiries: 0,
    favorites: 0
  });

  const [loading, setLoading] = useState(true);

  // ✅ FETCH DASHBOARD DATA
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "http://localhost:5000/api/buyer/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        setInquiries(data.inquiries || []);
        setFavorites(data.favorites?.map((f: any) => f.product) || []);
        setStats(data.stats || { inquiries: 0, favorites: 0 });

      } catch (error) {
        console.log("Dashboard error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const dashboardStats = [
    { label: "Inquiries Sent", value: stats.inquiries, icon: MessageSquare },
    { label: "Favorites", value: stats.favorites, icon: Heart },
    { label: "Pending Replies", value: inquiries.filter(i => i.status === "pending").length, icon: Clock },
    { label: "Products Viewed", value: 0, icon: Package }
  ];

  if (loading) {
    return <div className="p-10 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold">Buyer Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name || "Buyer"}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4">
            <s.icon className="h-5 w-5 text-primary mb-2" />
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
        <button
          onClick={() => setActiveTab("inquiries")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "inquiries"
              ? "bg-card shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          My Inquiries
        </button>

        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "favorites"
              ? "bg-card shadow-sm"
              : "text-muted-foreground"
          }`}
        >
          <Heart className="h-4 w-4" />
          Favorites
        </button>
      </div>

      {/* INQUIRIES TAB */}
      {activeTab === "inquiries" && (
        <div className="space-y-3">
          {inquiries.map((inq) => (
            <div
              key={inq._id}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm">
                    {inq.product?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {inq.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Qty: {inq.quantity}
                  </p>
                </div>

                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {inq.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FAVORITES TAB */}
      {activeTab === "favorites" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
