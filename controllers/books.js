const Books = require('../model/books')

exports.getAllBooks = (req,res)=>{
    Books.find()
        .then((data)=>{
            res.json(data)
        })
        .catch((err)=>{
            res.status(500).json({ error: 'Internal server error' })
        })
}

exports.getBookById = (req, res) => {
    const bookId = req.params.bookId;
  
    Books.findById(bookId)
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
  
exports.getAllBooksSorted = (req, res) => {
    let order = 1
    if(req.body.order==="asc")
        order = 1
    if(req.body.order==="dsc") 
        order =-1
    Books.find()
      .sort({ price: order })
      .then((data) => {
        res.json(data)
      })
      .catch((err) => console.log(err))
  }  
