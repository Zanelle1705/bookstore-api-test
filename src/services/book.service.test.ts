// src/services/book.service.test.ts

import { calculateDiscountedPriceByGenre } from "./book.service";
import { books } from "../repositories/book.repository";

describe("calculateDiscountedPriceByGenre", () => {
  beforeEach(() => {
    // Reset the books array before each test
    books.length = 0; // Clear the array
    books.push(
      {
        id: 1,
        title: "Book 1",
        author: "Author 1",
        genre: "Fiction",
        price: 50,
      },
      {
        id: 2,
        title: "Book 2",
        author: "Author 2",
        genre: "Fiction",
        price: 75,
      },
      {
        id: 3,
        title: "Book 3",
        author: "Author 3",
        genre: "Romance",
        price: 20,
      }
    );
  });

  // Test for correct discount calculation
  test("should calculate the total discounted price for a genre", () => {
    const result = calculateDiscountedPriceByGenre("Fiction", 10);
    expect(result).toEqual({
      genre: "Fiction",
      discount_percentage: 10,
      total_discounted_price: 112.5,
    });
  });

  // Test for correct decimal discount calculation
  test("should handle decimal discount values accurately", () => {
    const result = calculateDiscountedPriceByGenre("Fiction", 10.78);
    expect(result.genre).toBe("Fiction");
    expect(result.discount_percentage).toBeCloseTo(10.78, 2);
    expect(result.total_discounted_price).toBeCloseTo(111.53, 2);
  });

  // Test for total price if no books in the genre
  test("should return 0 for total if no books in the genre", () => {
    const result = calculateDiscountedPriceByGenre("Non-Fiction", 10);
    expect(result.total_discounted_price).toBe(0);
  });

  // Test for 0% discount
  test("should return the total original price if discount is 0%", () => {
    const result = calculateDiscountedPriceByGenre("Fiction", 0);
    expect(result.total_discounted_price).toBe(125);
  });

  // Test for 100% discount
  test("should return 0 for total discounted price if discount is 100%", () => {
    const result = calculateDiscountedPriceByGenre("Fiction", 100);
    expect(result.total_discounted_price).toBe(0);
  });

  // Test for negative discount
  test("should handle negative discount gracefully", () => {
    const result = calculateDiscountedPriceByGenre("Fiction", -10);
    expect(result.total_discounted_price).toBe(125);
  });
});
