# Bookstore API

A RESTful API for managing a bookstore inventory, built with Express and TypeScript following an
n-layered architecture. Supports CRUD operations on books and calculates total discounted prices
by genre.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Predefined Genres](#predefined-genres)
- [Mock Data](#mock-data)
- [API Endpoints](#api-endpoints)
- [Input Validation & Error Handling](#input-validation--error-handling)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Notes](#notes)

---

## Features

- Create, Read, Update, Delete (CRUD) operations for books
- Calculate total discounted price for books by genre
- Input validation with appropriate error responses
- Unit tests for discount calculation logic
- Written in TypeScript using an n-layered architecture

---

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:Zanelle1705/bookstore-api-test.git
cd bookstore-api-test
npm install
```

### Running the API

```bash
npm start
```

---

## Predefined Genres

The API supports book genres from a predefined list to ensure consistency and valid data. The
allowed genres are:

- Fiction
- Non-Fiction
- Fantasy
- Science Fiction
- Biography
- History
- Mystery
- Romance

When creating or updating books, the `genre` field must be one of the above values. Filters on
the `/books` endpoint also support filtering by these genres.

---

## Mock Data

The project uses the following in-memory dataset for demonstration purposes:

```bash
[
  {
    "id": 1,
    "title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "genre": "Fiction",
    "price": 50
  },
  {
    "id": 2,
    "title": "1984",
    "author": "George Orwell",
    "genre": "Fiction",
    "price": 75
  },
  {
    "id": 3,
    "title": "The Wish",
    "author": "Nicholas Sparks",
    "genre": "Romance",
    "price": 10
  }
]
```

---

## API Endpoints

### Books CRUD

| Method | Endpoint     | Description                                         |
| ------ | ------------ | --------------------------------------------------- |
| GET    | `/books`     | List all books (optional - filter by genre, author) |
| GET    | `/books/:id` | Retrieve a book by ID                               |
| POST   | `/books`     | Create a new book                                   |
| PUT    | `/books/:id` | Update a book by ID                                 |
| PATCH  | `/books/:id` | Partially update a book by ID                       |
| DELETE | `/books/:id` | Delete a book by ID                                 |

### Calculate Discounted Price by Genre

**GET** `/discounted-price`

| Parameter | Type   | Description                                                      | Required |
| --------- | ------ | ---------------------------------------------------------------- | -------- |
| genre     | string | Genre of the books (see [Predefined Genres](#predefined-genres)) | Yes      |
| discount  | number | Discount percentage (0-100)                                      | Yes      |

#### Example Request

```bash
GET /discounted-price?genre=Fiction&discount=10
```

#### Example Response

```bash
{
  "genre": "Fiction",
  "discount_percentage": 10,
  "total_discounted_price": 112.5
}
```

#### Error Responses

- `400 Bad Request` - Invalid or missing query parameters (e.g., invalid genre or discount out of range).
- `404 Not Found` - Book not found for given ID (for single book endpoints).

---

## Input Validation & Error Handling

- All inputs are validated for correct types and acceptable values.
- Genres must be from a predefined list (case-insensitive).
- Price must be a positive number.
- Discount percentages must be between 0 and 100 inclusive.
- Errors return appropriate HTTP status codes and descriptive JSON messages.

---

## Testing

Unit tests are provided for discount calculation logic. To run the tests:

```bash
npm test
```

Tests cover correct discount calculations and edge cases such 0% and 100% discounts, and if no
books in the genre.

---

## Project Structure

```bash
/ (root)
├── jest.config.js
├── package.json
├── README.md
├── tsconfig.json
└── src/
    ├── constants/
    │   └── genres.ts
    ├── controllers/
    │   └── book.controller.ts
    ├── models/
    │   └── book.model.ts
    ├── repositories/
    │   └── book.repository.ts
    ├── routes/
    │   └── book.routes.ts
    ├── services/
    │   ├── book.service.ts
    │   └── book.service.test.ts
    ├── utils/
    │   └── validator.ts
    └── index.ts

```

---

## Notes

- Uses an in-memory data store (array) for simplicity.
- Can be extended to use real database.
- Discount calculation is implemented in the service layer and fully tested.

---

## Author

Zanelle Botha  
Email: zanelle1705@gmail.com  
GitHub: [Zanelle1705](https://github.com/Zanelle1705)
