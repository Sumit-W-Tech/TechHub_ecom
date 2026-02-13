import Favorite from "../models/Favorite";

export const addFavorite = async (req: any, res: any) => {
  try {
    const { productId } = req.body;

    const exists = await Favorite.findOne({
      user: req.user.id,
      product: productId
    });

    if (exists) return res.json({ message: "Already favorite" });

    const fav = await Favorite.create({
      user: req.user.id,
      product: productId
    });

    res.status(201).json(fav);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
