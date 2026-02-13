import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-auto">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-lg font-display font-bold text-gradient">TradeHub</span>
          </div>
          <p className="text-sm text-muted-foreground">India's leading B2B marketplace connecting buyers and sellers across industries.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/products" className="block hover:text-primary transition-colors">All Products</Link>
            <Link to="/signup" className="block hover:text-primary transition-colors">BTradeHube a Seller</Link>
            <Link to="/login" className="block hover:text-primary transition-colors">Login</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Electronics</p><p>Machinery</p><p>Textiles</p><p>Agriculture</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>support@tradehub.com</p>
            <p>+91 1800-XXX-XXXX</p>
            <p>Mumbai, India</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © 2026 TradeHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
