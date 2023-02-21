const express = require("express");
const router = express.Router();

const { getUserById,getUser,addtoWishlist,getWishlist } = require("../controllers/user");

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.post("/user/:userId/wishlist", isSignedIn, isAuthenticated, addtoWishlist);
router.get("/user/:userId/wishlist", isSignedIn, isAuthenticated, getWishlist);

module.exports = router;
