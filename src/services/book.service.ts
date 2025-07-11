// src/services/book.service.ts
import { books } from "../repositories/book.repository";
import { Book } from "../models/book.model";
import { isValidDiscountNumber } from "../utils/validator";

type BookFilters = {
  author?: string;
  genre?: string;
};

export const getAllBooks = (filters?: BookFilters): Book[] => {
  if (!filters || Object.keys(filters).length === 0) {
    return books;
  }

  return books.filter((book) => {
    const matchesAuthor = filters.author
      ? book.author.toLowerCase().includes(filters.author.toLowerCase())
      : true;

    const matchesGenre = filters.genre
      ? book.genre.toLowerCase() === filters.genre.toLowerCase()
      : true;

    return matchesAuthor && matchesGenre;
  });
};

export const getBookById = (id: number): Book | undefined => {
  return books.find((book) => book.id === id);
};

// caller does not need to provide an id, the service will generate it
export const createBook = (newBook: Omit<Book, "id">): Book => {
  // If there are books, use last book id + 1, otherwise start from 1
  const id = books.length ? books[books.length - 1].id + 1 : 1;
  const bookWithId = { id, ...newBook };
  // Add the new book to the repository
  books.push(bookWithId);
  return bookWithId;
};

export const updateBook = (
  id: number,
  updatedBook: Omit<Book, "id">
): Book | undefined => {
  // Find index of the book to update with the given id
  const bookIndex = books.findIndex((book) => book.id === id);
  if (bookIndex === -1) {
    return undefined; // Book not found
  }
  const bookToUpdate = books[bookIndex];
  // Update the book properties
  const updatedBookWithId = { ...bookToUpdate, ...updatedBook };
  // Replace the old book with the updated one
  books[bookIndex] = updatedBookWithId;
  return updatedBookWithId;
};

export const patchBook = (id: number, updateFields: Partial<Book>): Book => {
  const book = getBookById(id);
  if (!book) {
    throw new Error("Book not found");
  }

  // Merge update fields with existing book properties
  Object.assign(book, updateFields);
  return book;
};

export const deleteBook = (id: number): void => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) {
    throw new Error("Book not found");
  }
  // splice(startIndex, deleteCount)
  books.splice(bookIndex, 1);
};

export const calculateDiscountedPriceByGenre = (
  genre: string,
  discount: number
) => {
  const validDiscount = isValidDiscountNumber(discount) ? discount : 0;

  const genreBooks = books.filter(
    (book) => book.genre.toLowerCase() === genre.toLowerCase()
  );

  // Reduce - accumulate or reduce the array to a single value
  const totalOriginalPrice = genreBooks.reduce(
    (sum, book) => sum + book.price,
    0
  );

  const totalDiscountedPrice =
    totalOriginalPrice * ((100 - validDiscount) / 100);

  return {
    genre,
    discount_percentage: validDiscount,
    total_discounted_price: parseFloat(totalDiscountedPrice.toFixed(2)),
  };
};
