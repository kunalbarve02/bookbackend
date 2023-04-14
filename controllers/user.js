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

exports.getRecommendations = async(req, res) => {
    const {wishlist,readBooks}=await User.findOne({ _id: req.profile._id })
        .populate("wishlist")
        .populate("readBooks")
        .exec((err, user) => {
        if (err) {
            return res.status(400).json({
            error: "No wishlist found"
            });
        }
        res.json(user.wishlist);
    })

    var wsfavAuthor, wsfavCategory, wsfavAuthorCount=0, wsfavCategoryCount=0

    await wishlist.forEach(book => {

        var authorCount=0, categoryCount=0;
        wishlist.forEach(book2 => {
            if(book2.Author==book.Author){
                authorCount++;
            }
            if(book2.Category==book.Category){
                categoryCount++;
            }
        }
        );

        if(authorCount>wsfavAuthorCount){
            wsfavAuthorCount=authorCount;
            wsfavAuthor=book.Author;
        }
        if(categoryCount>wsfavCategoryCount){
            wsfavCategoryCount=categoryCount;
            wsfavCategory=book.Category;
        }

    })

    var rbfavAuthor, rbfavCategory, rbfavAuthorCount=0, rbfavCategoryCount=0

    await readBooks.forEach(book => {
        
        var authorCount=0, categoryCount=0; 
        readBooks.forEach(book2 => {
            if(book2.Author==book.Author){
                authorCount++;
            }
            if(book2.Category==book.Category){
                categoryCount++;
            }
        }
        );

        if(authorCount>rbfavAuthorCount){
            rbfavAuthorCount=authorCount;
            rbfavAuthor=book.Author;
        }
        if(categoryCount>rbfavCategoryCount){
            rbfavCategoryCount=categoryCount;
            rbfavCategory=book.Category;
        }

    })

    Book.find({$or:[{Author:wsfavAuthor},{Category:wsfavCategory},{Author:rbfavAuthor},{Category:rbfavCategory}]})
    .then((books) => {
        res.json(books);
    }
    )
    .catch((err) => {
        console.log(err);
    }
    );

}