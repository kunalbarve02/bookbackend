const mongoose = require('mongoose');
    
const bookSchema = new mongoose.Schema({
    Category: String,
    'Sub-Category': String,
    Title: String,
    'BSR Ranking': String,
    'BSR Category': String,
    'Other Rank Category 1': String,
    'Category 1 ranking': String,
    'Other Rank Category 2': String,
    'Category 2 ranking': String,
    'Category 3 ranking': String,
    'Frequently Bought Together': String,
    Author: String,
    'URL-TITLE': String,
    'Paperback/Hardcover Price': Number,
    Publisher: String,
    ASIN: String,
    Language: String,
    Pages: String,
    'ISBN-13': String,
    'Item Weight': String,
    Dimensions: String,
    'Number of ratings': String,
    '5 star rating': String,
    '4 star rating': String,
    '3 star rating': String,
    '2 star rating': String,
    '1 star rating': String,
    'Rating out of 5 stars': String,
    'Book Option Price 1': String,
    'Book Option Price 2': String,
    'Book Option Price 3': String,
    'Book Option Price 4': String,
    'Book Option Price 5': String,
    'Book Option Price 6': String
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
