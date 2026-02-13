export interface Product {
  id: string;
  name: string;
  price: number;
  minOrder: number;
  description: string;
  category: string;
  color: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerLocation: string;
  rating: number;
  reviews: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  buyerName: string;
  buyerEmail: string;
  message: string;
  quantity: number;
  status: "pending" | "contacted" | "closed";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  status: "active" | "blocked" | "pending";
  joinedAt: string;
  avatar?: string;
}

export const categories: Category[] = [
  { id: "1", name: "Electronics", icon: "💻", count: 1240 },
  { id: "2", name: "Machinery", icon: "⚙️", count: 890 },
  { id: "3", name: "Textiles", icon: "🧵", count: 2100 },
  { id: "4", name: "Chemicals", icon: "🧪", count: 560 },
  { id: "5", name: "Agriculture", icon: "🌾", count: 1800 },
  { id: "6", name: "Construction", icon: "🏗️", count: 740 },
  { id: "7", name: "Auto Parts", icon: "🚗", count: 1350 },
  { id: "8", name: "Packaging", icon: "📦", count: 920 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Industrial CNC Machine",
    price: 25000,
    minOrder: 1,
    description: "High-precision CNC milling machine suitable for metal and wood processing. Features 3-axis movement, automatic tool changer, and digital readout system.",
    category: "Machinery",
    color: "Silver",
    images: [],
    sellerId: "s1",
    sellerName: "TechMach Industries",
    sellerLocation: "Mumbai, India",
    rating: 4.8,
    reviews: 124,
    createdAt: "2025-12-01",
  },
  {
    id: "2",
    name: "Organic Cotton Fabric Roll",
    price: 12,
    minOrder: 500,
    description: "Premium quality organic cotton fabric, GOTS certified. Available in multiple colors and patterns. Ideal for garment manufacturing.",
    category: "Textiles",
    color: "White",
    images: [],
    sellerId: "s2",
    sellerName: "GreenWeave Textiles",
    sellerLocation: "Surat, India",
    rating: 4.6,
    reviews: 89,
    createdAt: "2025-11-15",
  },
  {
    id: "3",
    name: "Solar Panel 400W Monocrystalline",
    price: 180,
    minOrder: 50,
    description: "High-efficiency monocrystalline solar panel with 400W output. 25-year performance warranty. Suitable for commercial installations.",
    category: "Electronics",
    color: "Blue",
    images: [],
    sellerId: "s3",
    sellerName: "SunPower Solutions",
    sellerLocation: "Delhi, India",
    rating: 4.9,
    reviews: 210,
    createdAt: "2025-10-20",
  },
  {
    id: "4",
    name: "Hydraulic Press 100 Ton",
    price: 15000,
    minOrder: 1,
    description: "Heavy-duty hydraulic press machine with 100-ton capacity. Features digital pressure gauge and safety mechanisms.",
    category: "Machinery",
    color: "Green",
    images: [],
    sellerId: "s1",
    sellerName: "TechMach Industries",
    sellerLocation: "Mumbai, India",
    rating: 4.7,
    reviews: 67,
    createdAt: "2025-09-10",
  },
  {
    id: "5",
    name: "Basmati Rice Premium Grade",
    price: 2.5,
    minOrder: 1000,
    description: "Long grain premium basmati rice. Aged for 2 years for superior taste and aroma. FSSAI certified, export quality.",
    category: "Agriculture",
    color: "White",
    images: [],
    sellerId: "s4",
    sellerName: "AgriGold Exports",
    sellerLocation: "Dehradun, India",
    rating: 4.5,
    reviews: 340,
    createdAt: "2025-11-28",
  },
  {
    id: "6",
    name: "LED Display Panel 55 inch",
    price: 350,
    minOrder: 10,
    description: "Commercial grade LED display panel for advertising and digital signage. Full HD resolution, 5000 nits brightness.",
    category: "Electronics",
    color: "Black",
    images: [],
    sellerId: "s5",
    sellerName: "BrightVision Tech",
    sellerLocation: "Shenzhen, China",
    rating: 4.4,
    reviews: 156,
    createdAt: "2025-12-05",
  },
  {
    id: "7",
    name: "Corrugated Packaging Boxes",
    price: 0.5,
    minOrder: 5000,
    description: "5-ply corrugated boxes for shipping and packaging. Custom sizes available. Eco-friendly and recyclable material.",
    category: "Packaging",
    color: "Brown",
    images: [],
    sellerId: "s6",
    sellerName: "PackRight Solutions",
    sellerLocation: "Pune, India",
    rating: 4.3,
    reviews: 78,
    createdAt: "2025-12-10",
  },
  {
    id: "8",
    name: "Brake Pads Set - Heavy Vehicle",
    price: 45,
    minOrder: 100,
    description: "Premium quality brake pads for heavy commercial vehicles. Ceramic compound for longer life. OEM compatible.",
    category: "Auto Parts",
    color: "Grey",
    images: [],
    sellerId: "s7",
    sellerName: "AutoParts Global",
    sellerLocation: "Chennai, India",
    rating: 4.6,
    reviews: 198,
    createdAt: "2025-11-20",
  },
];

export const inquiries: Inquiry[] = [
  { id: "i1", productId: "1", productName: "Industrial CNC Machine", buyerName: "Rajesh Kumar", buyerEmail: "rajesh@company.com", message: "Interested in bulk order. Please share best price for 5 units.", quantity: 5, status: "pending", createdAt: "2026-01-15" },
  { id: "i2", productId: "3", productName: "Solar Panel 400W", buyerName: "Priya Sharma", buyerEmail: "priya@solarcorp.com", message: "Need 200 panels for commercial project. Can you deliver to Bangalore?", quantity: 200, status: "contacted", createdAt: "2026-01-10" },
  { id: "i3", productId: "5", productName: "Basmati Rice Premium", buyerName: "Ahmed Khan", buyerEmail: "ahmed@exports.ae", message: "Looking for export quality. Need samples first.", quantity: 5000, status: "closed", createdAt: "2025-12-28" },
  { id: "i4", productId: "2", productName: "Organic Cotton Fabric", buyerName: "Lisa Wang", buyerEmail: "lisa@fashionco.com", message: "Interested in organic cotton for our new clothing line.", quantity: 2000, status: "pending", createdAt: "2026-02-01" },
  { id: "i5", productId: "6", productName: "LED Display Panel", buyerName: "Suresh Patel", buyerEmail: "suresh@mediaads.com", message: "Need 50 units for mall advertising project.", quantity: 50, status: "pending", createdAt: "2026-02-05" },
];

export const users: User[] = [
  { id: "s1", name: "TechMach Industries", email: "info@techmach.com", role: "seller", status: "active", joinedAt: "2025-06-15" },
  { id: "s2", name: "GreenWeave Textiles", email: "sales@greenweave.com", role: "seller", status: "active", joinedAt: "2025-07-20" },
  { id: "s3", name: "SunPower Solutions", email: "contact@sunpower.in", role: "seller", status: "pending", joinedAt: "2025-12-01" },
  { id: "b1", name: "Rajesh Kumar", email: "rajesh@company.com", role: "buyer", status: "active", joinedAt: "2025-08-10" },
  { id: "b2", name: "Priya Sharma", email: "priya@solarcorp.com", role: "buyer", status: "active", joinedAt: "2025-09-15" },
  { id: "b3", name: "Ahmed Khan", email: "ahmed@exports.ae", role: "buyer", status: "blocked", joinedAt: "2025-10-05" },
];
