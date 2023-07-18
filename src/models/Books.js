const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        name: String,
        category: String,
        author: String,
        publisherName: String,
        description: String,
        price: Number,
        quantity: Number,
        image: String
    },
    { timestamp: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;