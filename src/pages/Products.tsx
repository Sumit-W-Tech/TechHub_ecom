import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/mockData";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = !selectedCategory || p.category === selectedCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchSearch && matchCat && matchPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory || "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>
        <Button variant="outline" size="sm" className="md:hidden gap-1.5" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
          <div className="rounded-xl border border-border bg-card p-5 space-y-6 sticky top-20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => { setSelectedCategory(""); setPriceRange([0, 50000]); }}>
                Clear
              </Button>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Category</h4>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.name
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-3">Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {selectedCategory && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtered by:</span>
              <span className="inline-flex items-center gap-1 text-sm bg-accent text-accent-foreground px-3 py-1 rounded-full">
                {selectedCategory}
                <button onClick={() => setSelectedCategory("")}><X className="h-3 w-3" /></button>
              </span>
            </div>
          )}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
