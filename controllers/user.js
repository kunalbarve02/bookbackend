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