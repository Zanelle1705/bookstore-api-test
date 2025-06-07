// src/constants/genres.ts

// Prevents typos in genre names (eg. Fantazy)
export const ALLOWED_GENRES = [
  "Fiction",
  "Non-fiction",
  "Fantasy",
  "Science Fiction",
  "Biography",
  "History",
  "Mystery",
  "Romance",
] as const;

// Creates a union type from the allowed genres
export type Genre = (typeof ALLOWED_GENRES)[number];
