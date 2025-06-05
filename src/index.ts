// src/index.ts
// Set up express server with TypeScript

import express, { Request, Response, NextFunction } from "express";
import bookRoutes from "./routes/book.routes"; // Assuming you have a book.routes.ts file

const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// TESTING: Basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("📚 Bookstore API is running!");
});

// Mount routes
app.use("/books", bookRoutes); // Use the book routes (Mount book API routes)

// Error handling middleware (order matters, should be after all routes)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
