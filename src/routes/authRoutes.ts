import express from "express";
import { loginUser, registerUser } from "../controllers/authController";
import { getProductById, getProducts } from "../controllers/productController";
import { createInquiry } from "../controllers/inquiryController";
import { addFavorite } from "../controllers/favoriteController";
import { buyerDashboard } from "../controllers/buyerController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/inquiry", createInquiry);
router.post("/favorite", addFavorite);
router.get("/dashboard", buyerDashboard);

export default router;
