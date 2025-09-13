import Book from "../models/Book.js";

// GET /api/books
export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 50, rating, minPrice, maxPrice, inStock, search } =
      req.query;

    const query = {};

    if (rating) query.rating = rating;
    if (search) query.title = { $regex: search, $options: "i" };
    if (inStock) query.availability = /In stock/;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = `£${minPrice}`;
      if (maxPrice) query.price.$lte = `£${maxPrice}`;
    }

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Book.countDocuments(query);

    res.json({ total, page, books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
