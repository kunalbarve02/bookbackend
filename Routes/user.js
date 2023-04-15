const express = require("express");
const router = express.Router();

const { getUserById,getUser,addtoWishlist,getWishlist,addtoReadBooks,getReadBooks, getRecommendedBooks } = require("../controllers/user");
const { getBookByCategory } = require("../controllers/books");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.post("/user/:userId/wishlist", isSignedIn, isAuthenticated, addtoWishlist);
router.get("/user/:userId/wishlist", isSignedIn, isAuthenticated, getWishlist);
router.post("/user/:userId/readBooks", isSignedIn, isAuthenticated, addtoReadBooks);
router.get("/user/:userId/readBooks", isSignedIn, isAuthenticated, getReadBooks);
router.get("/user/:userId/favorites",isSignedIn,isAuthenticated,getBookByCategory);
router.get("/user/:userId/getRecommendations",isSignedIn,isAuthenticated,getRecommendedBooks);

module.exports = router;
