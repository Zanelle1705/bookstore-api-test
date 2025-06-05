// src/utils/validator.ts

import { Book } from "../models/book.model";
import { ALLOWED_GENRES, Genre } from "../constants/genres";

// Validate that the genre is one of the allowed genres (also make case-insensitive)
export const isValidGenre = (genre: string): genre is Genre => {
  return ALLOWED_GENRES.includes(
    genre
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()) as Genre
  );
};

// Validate the book type and that it is not empty
export const isValidBookInput = (input: any): input is Omit<Book, "id"> => {
  return (
    typeof input.title === "string" &&
    typeof input.author === "string" &&
    typeof input.genre === "string" &&
    typeof input.price === "number" &&
    input.title.trim() !== "" &&
    input.author.trim() !== "" &&
    isValidGenre(input.genre) &&
    input.price > 0
  );
};

// Validates only fields send for patching
export const isValidBookPatch = (input: any): boolean => {
  const { title, author, genre, price } = input;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return false;
  }

  if (
    author !== undefined &&
    (typeof author !== "string" || author.trim() === "")
  ) {
    return false;
  }

  if (
    genre !== undefined &&
    (typeof genre !== "string" || !isValidGenre(genre))
  ) {
    return false;
  }

  if (price !== undefined && (typeof price !== "number" || price <= 0)) {
    return false;
  }

  return true;
};
