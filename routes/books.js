const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/', async (req, res) => {
    try {
        const books = await Book.find()
        res.json(books)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/', async (req, res) => {
    const book = new Book({
        title: req.body.title,
        authors: req.body.authors,
        pages: req.body.pages,
        language: req.body.language,
        publisher: req.body.publisher,
    })
    try {
        const newbook = await book.save()
        res.status(201).json(newbook)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const foundBooks = await Book.find({ publisher: req.params.id }).exec();

        if (foundBooks == null) {
            return res.status(404).json({ message: 'Cannot find Any Book By this publisher' })
        }
        res.status(201).json(foundBooks)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router