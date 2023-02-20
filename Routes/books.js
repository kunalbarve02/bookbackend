const express = require("express");
const { getAllBooks,getBookById,getAllBooksSorted } = require("../controllers/books");
const router = express.Router();

router.get("/books", getAllBooks)
router.get("/books/:bookId",getBookById)
router.get("/books/sort/price",getAllBooksSorted)


module.exports = router;