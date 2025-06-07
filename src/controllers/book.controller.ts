// src/controllers/book.controller.ts
import { Request, Response, NextFunction } from "express";
import * as bookService from "../services/book.service";
import {
  isValidBookInput,
  isValidBookPatch,
  isValidGenre,
  isValidDiscountNumber,
} from "../utils/validator";

export const getAllBooks = (req: Request, res: Response) => {
  const { author, genre } = req.query;

  if (genre && typeof genre === "string" && !isValidGenre(genre)) {
    res.status(400).json({ message: "Invalid genre filter" });
    return;
  }
  const filters = {
    author: typeof author === "string" ? author : undefined,
    genre: typeof genre === "string" ? genre : undefined,
  };

  const books = bookService.getAllBooks(filters);
  res.json(books);
};

// Use async for real-world scenarios
export const getBookById = (
  req: Request,
  res: Response,
  next: NextFunction // Playing around, use to handle errors globally
) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const book = bookService.getBookById(bookId);

    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(book);
  } catch (err) {
    // Normally when using async/await, you would catch errors here
    // Pass error to global error handler
    next(err);
  }
};

export const createBook = (req: Request, res: Response) => {
  const { title, author, genre, price } = req.body;
  if (!isValidBookInput(req.body)) {
    res.status(400).json({ message: "Invalid book data" });
    return;
  }
  const newBook = bookService.createBook({
    title,
    author,
    genre,
    price,
  });
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id, 10);
  const { title, author, genre, price } = req.body;
  if (!isValidBookInput(req.body)) {
    res.status(400).json({ message: "Invalid book data" });
    return;
  }
  const updatedBook = bookService.updateBook(bookId, {
    title,
    author,
    genre,
    price,
  });
  if (!updatedBook) {
    res.status(404).json({ message: "Book not found" });
    return;
  }
  res.json(updatedBook);
};

export const patchBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.id, 10);
    const updateFields = req.body;

    if (!isValidBookPatch(updateFields)) {
      res.status(400).json({ message: "Invalid book patch data" });
      return;
    }

    const updatedBook = bookService.patchBook(bookId, updateFields);
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = parseInt(req.params.id);
    bookService.deleteBook(bookId);
    res.status(204).send(); // No content - success but no response body
  } catch (err) {
    next(err); // Pass error to global error handler
  }
};

export const getDiscountedPriceByGenre = (req: Request, res: Response) => {
  const { genre, discount } = req.query;

  if (typeof genre !== "string" || !isValidGenre(genre)) {
    res.status(400).json({ message: "Invalid genre" });
    return;
  }

  const discountedNr = Number(discount);
  if (!isValidDiscountNumber(discountedNr)) {
    res
      .status(400)
      .json({ message: "Discount must be a number between 0 and 100" });
    return;
  }

  const discountResult = bookService.calculateDiscountedPriceByGenre(
    genre,
    discountedNr
  );
  res.json(discountResult);
};
