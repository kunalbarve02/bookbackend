const Book = require('../model/books')
const Books = require('../model/books')

exports.getAllBooks = (req,res)=>{
    console.log("getAllBooks")
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.skip ? parseInt(req.query.page) : 1;
    Books.find()
        .limit(limit)
        .skip((skip-1)*limit)
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.status(500).json({ error: 'Internal server error' })
            console.log(err)
        })
}

exports.getBookById = (req, res) => {
    console.log("getBookById")
    const bookId = req.params.bookId;
    console.log(bookId)
    Books.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
        console.log(book)
        res.json(book);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
      });
};
  
exports.getAllBooksSortedByPrice = (req, res) => {
  const { order } = req.query;
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.page) : 1;
  console.log("getAllBooksSortedByPrice")
  
  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }

  Book.find()
    .sort({ 'Paperback.Hardcover Price': sortOrder })
    .limit(limit)
    .skip((skip-1)*limit)
    .then((books) => {
      res.json(books);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error getting books by price' });
    });
}  

exports.getAllBooksSortedByRating = (req, res) => {
  console.log("getAllBooksSortedByRating")
  const { order } = req.query;
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.page) : 1;

  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }

  Book.find()
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ "Rating out of 5 stars": sortOrder }) // sort by rating in descending order
  .exec((err, books) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(books);
  });
}

exports.getAllBooksSortedByNoOfReviews = (req, res) => {
  console.log("getAllBooksSortedByNoOfReviews")
  const { order } = req.query;
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.page) : 1;

  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }

  Book.find()
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ "Number of ratings": sortOrder }) // sort by rating in descending order
  .then((err, books) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(books);
  });

}

exports.getFilteredBooks = (req, res) => {
  console.log("getFilteredBooks")
  const { category, author } = req.body;
  const query = {};

  if (category) {
    query.Category = category;
  }

  if (author) {
    query.Author = author;
  }
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.page) : 1;

  let order = 1;
  if (req.body.order === "dsc") order = -1;
  
  console.log(query)

  Book.find(
    query
  )
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ price: order })
  .then((data) => {
    res.json(data);
  })
  .catch((err)=>console.log(err))
}

exports.getAllCategories = (req, res) => {
  console.log("getAllCategories")
  Book.distinct('Category')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Error getting categories' });
    });
};

exports.searchBooks = (req, res) => {
  const { search } = req.query;
  console.log(search)
  Book.find(
    { Title: { $regex: search, $options: 'i' } },
  )
  .then((data) => {
    console.log(data);
    if(data.length==0) return res.status(404).json({ error: 'No books found' });
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting books' });
  });
}



exports.getBookByCategory = (req, res) => {
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.page) : 1;
  var category = req.profile.favoriteCategory

  Book.find({Category: category})
  .limit(limit)
  .skip((skip-1)*limit)
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting books' });
  }
)
}
