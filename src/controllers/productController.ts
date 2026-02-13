import Product from "../models/Product";

export const getProducts = async (req: any, res: any) => {
  try {
    const { search, category } = req.query;

    let query: any = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query).populate("seller", "name");

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById = async (req: any, res: any) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
