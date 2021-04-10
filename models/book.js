const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    pages: { type: [Number], required: true },
    published_date: { type: [Date], default: Date.now },
    language: String,
    publisher: String
});

module.exports = mongoose.model('Book', bookSchema);

