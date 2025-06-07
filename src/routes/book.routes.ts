// src/routes/book.routes.ts
import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  patchBook,
  getDiscountedPriceByGenre,
} from "../controllers/book.controller";

const router = Router();

// Static routes
router.get("/", getAllBooks);
router.get("/discounted-price", getDiscountedPriceByGenre);

// Dynamic routes
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.patch("/:id", patchBook);
router.delete("/:id", deleteBook);

export default router;
