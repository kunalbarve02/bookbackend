const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    Category: { type: String, required: true },
    "Sub-Category": { type: String, required: true },
    Title: { type: String, required: true },
    "BSR Ranking": { type: String, required: true },
    "BSR Category": { type: String, required: true },
    "Other Rank Category 1": { type: String, required: true },
    "Category 1 ranking": { type: String, required: true },
    "Other Rank Category 2": { type: String, required: true },
    "Category 2 ranking": { type: String, required: true },
    "Category 3 ranking": { type: String, required: true },
    "Frequently Bought Together": { type: String, required: true },
    Author: { type: String, required: true },
    "URL-TITLE": { type: String, required: true },
    "Paperback/Hardcover Price": { type: Number, required: true },
    Publisher: { type: String, required: true },
    ASIN: { type: String, required: true },
    Language: { type: String, required: true },
    Pages: { type: String, required: true },
    "ISBN-13": { type: String, required: true },
    "Item Weight": { type: String, required: true },
    Dimensions: { type: String, required: true },
    "Number of ratings": { type: String, required: true },
    "5 star rating": { type: String, required: true },
    "4 star rating": { type: String, required: true },
    "3 star rating": { type: String, required: true },
    "2 star rating": { type: String, required: true },
    "1 star rating": { type: String, required: true },
    "Rating out of 5 stars": { type: String, required: true },
    "Book Option Price 1": { type: String, required: true },
    "Book Option Price 2": { type: String, required: true },
    "Book Option Price 3": { type: String, required: true },
    "Book Option Price 4": { type: String, required: true },
    "Book Option Price 5": { type: String, required: true },
    "Book Option Price 6": { type: String, required: true },
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
