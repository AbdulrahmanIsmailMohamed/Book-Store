const asyncHandling = require("../middleware/asyncHandler")
const Book = require('../models/Books');
const APIError = require('../utils/APIError');

const addBook = asyncHandling(async (req, res, next) => {
    const book = await Book.create(req.body);
    if (!book) return next(new APIError("Can't add books", 400));
    res.status(201).json(book);
});

const updateBook = asyncHandling(async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return next(new APIError("Can't find books", 404));
    res.status(200).json(book);
});

const book = asyncHandling(async (req, res, next) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) return next(new APIError("Can't find book for this id", 404));
    res.status(200).json(book);
});

const deleteBook = asyncHandling(async (req, res, next) => {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return next(new APIError("Can't delete book for this id", 400));
    res.status(204).json({ status: "Success" })
});

const books = asyncHandling(async (req, res, next) => {
    let filter = {}
    if (req.query.keywords) {
        filter = { name: { $regex: req.query.keywords, $options: "i" } }
    }

    const books = await Book.find(filter);
    if (!books) return next(new APIError("Can't find books", 404));
    res.status(200).json(books);
});

const countOfBooks = asyncHandling(async (req, res, next) => {
    const countBooks = await Book.countDocuments();
    if (!countBooks) return next(new APIError("Can't find books", 404));
    res.status(200).json(countBooks);
});

module.exports = {
    addBook,
    deleteBook,
    updateBook,
    book,
    books,
    countOfBooks
}