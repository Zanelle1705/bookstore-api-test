// src/models/book.model.ts

import { Genre } from "../constants/genres";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  price: number;
}
