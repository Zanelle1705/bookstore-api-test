// src/routes/book.routes.ts
import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  patchBook,
} from "../controllers/book.controller";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.patch("/:id", patchBook);
router.delete("/:id", deleteBook);

export default router;
