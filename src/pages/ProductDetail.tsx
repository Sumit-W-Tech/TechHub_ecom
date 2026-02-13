import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Shield, ArrowLeft, Send, Heart, Share2, MessageSquare } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useChat } from "@/hooks/useChat";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { user, isAuthenticated } = useAuth();
  const { startConversation } = useChat();
  const navigate = useNavigate();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiry, setInquiry] = useState({ name: "", email: "", message: "", quantity: "" });
  const [chatLoading, setChatLoading] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">😕</p>
        <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
        <Link to="/products"><Button variant="outline">Back to Products</Button></Link>
      </div>
    );
  }

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry sent successfully! The seller will contact you soon.");
    setInquiryOpen(false);
    setInquiry({ name: "", email: "", message: "", quantity: "" });
  };

  const handleChatWithSeller = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to chat with the seller");
      navigate("/login");
      return;
    }
    setChatLoading(true);
    // For demo, we use the sellerId as-is. In production this would be the seller's auth user_id
    const conv = await startConversation(product.sellerId, product.id, product.name);
    setChatLoading(false);
    if (conv) {
      navigate("/chat");
    } else {
      toast.error("Could not start conversation. The seller may not be registered yet.");
    }
  };

  const emoji = product.category === "Electronics" ? "💻" : product.category === "Machinery" ? "⚙️" : product.category === "Textiles" ? "🧵" : product.category === "Agriculture" ? "🌾" : product.category === "Packaging" ? "📦" : product.category === "Auto Parts" ? "🚗" : "🏷️";

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl bg-muted aspect-square flex items-center justify-center text-[120px] border border-border">
          {emoji}
        </div>

        <div>
          <span className="text-xs font-medium bg-accent text-accent-foreground px-3 py-1 rounded-full">{product.category}</span>
          <h1 className="text-2xl md:text-3xl font-display font-bold mt-3">{product.name}</h1>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-display font-bold text-primary">${product.price}</span>
            <span className="text-muted-foreground">/ unit</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Min. Order: {product.minOrder} units</p>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">{product.sellerName}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />{product.sellerLocation}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <Button size="lg" className="flex-1 font-semibold gap-2" onClick={() => setInquiryOpen(true)}>
              <Send className="h-4 w-4" /> Send Inquiry
            </Button>
            <Button size="lg" variant="outline" className="gap-2" onClick={handleChatWithSeller} disabled={chatLoading}>
              <MessageSquare className="h-4 w-4" /> Chat with Seller
            </Button>
            <Button size="lg" variant="outline"><Heart className="h-4 w-4" /></Button>
            <Button size="lg" variant="outline"><Share2 className="h-4 w-4" /></Button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-muted-foreground">Color</span>
              <p className="font-medium">{product.color}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <span className="text-muted-foreground">Category</span>
              <p className="font-medium">{product.category}</p>
            </div>
          </div>
        </div>
      </div>

      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4" onClick={() => setInquiryOpen(false)}>
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-soft border border-border animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-display font-bold mb-1">Send Inquiry</h3>
            <p className="text-sm text-muted-foreground mb-4">Contact seller about {product.name}</p>
            <form onSubmit={handleInquiry} className="space-y-3">
              <input required placeholder="Your Name" value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="email" placeholder="Your Email" value={inquiry.email} onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <input required type="number" placeholder="Quantity Required" value={inquiry.quantity} onChange={(e) => setInquiry({ ...inquiry, quantity: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea required placeholder="Your message to the seller..." rows={3} value={inquiry.message} onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 font-semibold gap-2"><Send className="h-4 w-4" />Send</Button>
                <Button type="button" variant="outline" onClick={() => setInquiryOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
