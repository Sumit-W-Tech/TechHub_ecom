import Inquiry from "../models/Inquiry";
import Product from "../models/Product";

export const createInquiry = async (req: any, res: any) => {
  try {
    const { productId, message, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const inquiry = await Inquiry.create({
      buyer: req.user.id,
      seller: product.seller,
      product: productId,
      message,
      quantity
    });

    res.status(201).json(inquiry);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
