import { Request, Response } from "express";
import Inquiry from "../models/Inquiry";
import Favorite from "../models/Favorite";

export const buyerDashboard = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const inquiries = await Inquiry.find({ buyer: userId })
      .populate("product");

    const favorites = await Favorite.find({ user: userId })
      .populate("product");

    res.json({
      inquiries,
      favorites,
      stats: {
        inquiries: inquiries.length,
        favorites: favorites.length
      }
    });

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
