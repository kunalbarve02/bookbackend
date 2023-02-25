const express = require("express");
const { getAllBooks,getBookById,getAllBooksSortedByPrice,getFilteredBooks,getAllBooksSortedByRating,getAllCategories } = require("../controllers/books");
const router = express.Router();

router.get("/books", getAllBooks)
router.get("/books/:bookId",getBookById)
router.get("/books/sort/price",getAllBooksSortedByPrice)
router.get("/books/sort/rating",getAllBooksSortedByRating)
router.get("/books/filter",getFilteredBooks)
router.get("/books/categories",getAllCategories)


module.exports = router;