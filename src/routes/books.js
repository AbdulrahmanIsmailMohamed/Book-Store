const router = require("express").Router();

const { protectRoute, allowTo } = require("../config/auth")

const {
    addBook,
    updateBook,
    deleteBook,
    book,
    books,
    countOfBooks
} = require("../controllers/books.controller")

router.use(protectRoute)

router
    .route("/")
    .post(allowTo("admin"), addBook)
    .get(books)

router.get("/get", countOfBooks)

router
    .route("/:bookId")
    .patch(allowTo("admin"), updateBook)
    .delete(allowTo("admin"), deleteBook)
    .get(book)

module.exports = router;