const Book = require("../model/books");
const User = require("../model/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
        return res.status(400).json({
            error: "No user was found in DB"
        });
        }
        req.profile = user;
        next();
    });
};
  
exports.getUser = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.addtoWishlist = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { wishlist: req.body.bookId } },
        { new: true },
        (err, wishlist) => {
        if (err) {
            return res.status(400).json({
            error: "Unable to add to wishlist"
            });
        }
        res.json(wishlist);
        }
    );
}

exports.getWishlist = (req, res) => {
    User.findOne({ _id: req.profile._id })
        .populate("wishlist")
        .exec((err, user) => {
        if (err) {
            return res.status(400).json({
            error: "No wishlist found"
            });
        }
        res.json(user.wishlist);
        });
}

exports.addtoReadBooks = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { readBooks: req.body.bookId } },
        { new: true },
    )
    .then((readBooks) => {
        res.json({
            message: "Book added to readBooks",
        });
    })
    .catch((err) => {
        console.log(err);
    }
    );
}

exports.getReadBooks = (req, res) => {
    User.findOne({ _id: req.profile._id })
        .populate("readBooks")
        .exec((err, user) => {
        if (err) {
            return res.status(400).json({
            error: "No readBooks found"
            });
        }
        res.json(user.readBooks);
        });
}

exports.getRecommendedBooks=async (userId)=>{

    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.skip ? parseInt(req.query.skip) : 1;

    try {
      const user = await User.findById(userId)
        .populate("wishlist", "Category Author")
        .populate("readBooks", "Category Author");
  
      // Get most occurring author and category from wishlist
      let wishlistAuthors = {};
      let wishlistCategories = {};
      user.wishlist.forEach((book) => {
        wishlistAuthors[book.Author] = (wishlistAuthors[book.Author] || 0) + 1;
        wishlistCategories[book.Category] = (wishlistCategories[book.Category] || 0) + 1;
      });
      const mostOccurringWishlistAuthor = Object.keys(wishlistAuthors).reduce((a, b) =>
        wishlistAuthors[a] > wishlistAuthors[b] ? a : b
      );
      const mostOccurringWishlistCategory = Object.keys(wishlistCategories).reduce((a, b) =>
        wishlistCategories[a] > wishlistCategories[b] ? a : b
      );
  
      // Get most occurring author and category from readBooks
      let readBooksAuthors = {};
      let readBooksCategories = {};
      user.readBooks.forEach((book) => {
        readBooksAuthors[book.Author] = (readBooksAuthors[book.Author] || 0) + 1;
        readBooksCategories[book.Category] = (readBooksCategories[book.Category] || 0) + 1;
      });
      const mostOccurringReadBooksAuthor = Object.keys(readBooksAuthors).reduce((a, b) =>
        readBooksAuthors[a] > readBooksAuthors[b] ? a : b
      );
      const mostOccurringReadBooksCategory = Object.keys(readBooksCategories).reduce((a, b) =>
        readBooksCategories[a] > readBooksCategories[b] ? a : b
      );
  
      // Get books with most occurring author and category
      Book.find({
          $or: [
            { Author: mostOccurringWishlistAuthor, Category: mostOccurringWishlistCategory },
            { Author: mostOccurringReadBooksAuthor, Category: mostOccurringReadBooksCategory }
          ]
        })
      .limit(limit)
      .skip(skip)
      .exec((err, books) => {
        if (err) {
          return res.status(400).json({
            error: "No books found"
          });
        }
        res.json(books);
      });

      return recommendedBooks;
    } catch (err) {
      console.log(err);
    }
  }
  