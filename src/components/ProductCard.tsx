import { Link } from "react-router-dom";
import { Star, MapPin, Heart } from "lucide-react";
import { Product } from "@/data/mockData";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500">
            {product.category === "Electronics" ? "💻" :
             product.category === "Machinery" ? "⚙️" :
             product.category === "Textiles" ? "🧵" :
             product.category === "Agriculture" ? "🌾" :
             product.category === "Packaging" ? "📦" :
             product.category === "Auto Parts" ? "🚗" : "🏷️"}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">{product.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary">${product.price}</span>
            <span className="text-xs text-muted-foreground">/ unit</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Min. Order: {product.minOrder} units</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span className="truncate max-w-[120px]">{product.sellerLocation}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
