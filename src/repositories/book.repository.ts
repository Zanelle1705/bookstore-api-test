// src/repositories/book.repository.ts
import { Book } from "../models/book.model";

// Simulate database

export const books: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    price: 50,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    price: 75,
  },
  {
    id: 3,
    title: "The Wish",
    author: "Nicholas Sparks",
    genre: "Romance",
    price: 10,
  },
];
