import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";
import { categories, products } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[520px] flex items-center overflow-hidden">
        <img src={heroBg} alt="B2B Marketplace" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-hero" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-extrabold text-primary-foreground mb-4 animate-fade-in">
            India's Largest<br />B2B Marketplace
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Connect with verified suppliers. Source products at wholesale prices. Grow your business.
          </p>
          <form onSubmit={handleSearch} className="max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex bg-card rounded-xl overflow-hidden shadow-soft">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products, suppliers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button type="submit"  className="rounded-none rounded-r-xl px-8 py-7 font-semibold">
                Search
              </Button>
            </div>
          </form>
          <div className="mt-6 flex flex-wrap justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {["Electronics", "Machinery", "Textiles", "Agriculture"].map((cat) => (
              <Link key={cat} to={`/products?category=${cat}`}>
                <span className="text-sm text-primary-foreground/70 hover:text-primary-foreground border border-primary-foreground/20 rounded-full px-4 py-1.5 transition-colors hover:border-primary-foreground/50">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "Products Listed", value: "50K+", icon: TrendingUp },
              { label: "Verified Sellers", value: "10K+", icon: Shield },
              { label: "Categories", value: "200+", icon: Globe },
              { label: "Daily Inquiries", value: "5K+", icon: ArrowRight },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <stat.icon className="h-5 w-5 text-primary mb-1" />
                <span className="text-2xl font-display font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold">Browse Categories</h2>
            <p className="text-muted-foreground mt-1">Find products across all industries</p>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/products?category=${cat.name}`}>
              <div className="rounded-xl border border-border bg-card p-6 text-center hover:shadow-soft hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5">
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count.toLocaleString()} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-1">Top picks from verified sellers</p>
            </div>
            <Link to="/products">
              <Button variant="ghost" className="gap-1">
                See All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-2xl gradient-primary p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
            Join thousands of businesses already trading on TradeHub. Start selling or sourcing today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="font-semibold">
                Start Selling
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="font-semibold ">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
