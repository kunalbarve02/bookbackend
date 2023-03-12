const express = require("express");
const { getAllBooks,getBookById,getAllBooksSortedByPrice,getFilteredBooks,getAllBooksSortedByRating,getAllCategories,searchBooks,getAllBooksSortedByNoOfReviews } = require("../controllers/books");
const { getUserById } = require("../controllers/user")
const router = express.Router();

router.param("userId", getUserById);

router.get("/books/all", getAllBooks)
router.get("/books/byid/:bookId",getBookById)
router.get("/books/search",searchBooks)
router.get("/books/sort/price",getAllBooksSortedByPrice)
router.get("/books/sort/rating",getAllBooksSortedByRating)
router.get("/books/sort/noOfReviews",getAllBooksSortedByNoOfReviews)
router.get("/books/filter",getFilteredBooks)
router.get("/books/categories",getAllCategories)

module.exports = router;