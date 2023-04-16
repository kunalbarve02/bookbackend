const Book = require('../model/books')

exports.getAllBooks = (req,res)=>{
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;
    var skip = req.query.skip ? parseInt(req.query.skip) : 1;
    Book.find()
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
    const bookId = req.params.bookId;
    Book.findById(bookId)
      .then((book) => {
        if (!book) {
          return res.status(404).json({ message: 'Book not found' });
        }
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
  var skip = req.query.skip ? parseInt(req.query.skip) : 1;
  
  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }

  Book.find()
    .sort({ 'Paperback/Hardcover Price': sortOrder })
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
  const { order } = req.query;
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.skip) : 1;

  let sortOrder = 1;
  if (order === 'desc') {
    sortOrder = -1;
  }

  Book.find()
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ "Rating out of 5 stars": sortOrder })
  .exec((err, books) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(books);
  });
}

exports.getAllBooksSortedByNoOfReviews = (req, res) => {
  const { order } = req.query
  var limit = req.query.limit ? parseInt(req.query.limit) : 10
  var skip = req.query.skip ? parseInt(req.query.skip) : 1

  let sortOrder = 1
  if (order === 'dsc') {
    sortOrder = -1
  }

  Book.find()
  .select({ 'Number of ratings': 1})
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ "Number of ratings": sortOrder })
  .then((books) => {
    res.json(books)
  })
  .catch((err) => {
    console.log(err)
    res.status(500).json({ error: 'Error getting books by price' })
  });

}

exports.getFilteredBooks = (req, res) => {
  var { category, author, minPrice, maxPrice, sortBy } = req.query

  var fields = ['Paperback/Hardcover Price', 'Rating out of 5 stars', 'Number of ratings', 'Category', 'Author']

  const query = {}
  if (category) {
    console.log(category)
    query.Category = category
  }

  if (author) {
    query.Author = author;
  }

  if(minPrice && maxPrice){
    query['Paperback/Hardcover Price'] = { $gte: minPrice, $lte: maxPrice }
  }
  else if(minPrice){
    query['Paperback/Hardcover Price'] = { $gte: minPrice }
  }
  else if(maxPrice){
    query['Paperback/Hardcover Price'] = { $lte: maxPrice }
  }

  fields.includes(sortBy)? sortBy : 'Paperback/Hardcover Price'

  var limit = req.query.limit ? parseInt(req.query.limit) : 10
  var skip = req.query.skip ? parseInt(req.query.skip) : 1
  
  let order = 1;
  if (req.query.order === "dsc") order = -1

  Book.find(
    query
  )
  .limit(limit)
  .skip((skip-1)*limit)
  .sort({ sortBy: order })
  .then((data) => {
    res.json(data);
  })
  .catch((err)=>console.log(err))
}

exports.getAllCategories = (req, res) => {
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
  var skip = req.query.skip ? parseInt(req.query.skip) : 1;
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

exports.getAllAuthors = (req, res) => {
  let limit = req.params.limit ? parseInt(req.params.limit) : 10;
  let skip = req.params.skip ? parseInt(req.params.skip) : 1;

  Book.distinct('Author')
    .limit(limit)
    .skip((skip-1)*limit)
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ error: 'Error getting authors' });
    })
}

exports.getBookByAuthor = (req, res) => {

  Book.find({Author: req.body.author})
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ error: 'Error getting books' });
  })
  
}
