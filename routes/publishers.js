const express = require('express')
const router = express.Router()
const Publisher = require('../models/publisher')

router.get('/', async (req, res) => {
    try {
        const publishers = await Publisher.find()
        res.json(publishers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getPublisher, (req, res) => {
    res.json(res.publisher)
})

// Creating New Publisher
router.post('/', async (req, res) => {
    const publisher = new Publisher({
        name: req.body.name,
        founded: req.body.founded,
        location: req.body.location
    })
    try {
        const newPublisher = await publisher.save()
        res.status(201).json(newPublisher)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


router.delete('/:id', getPublisher, async (req, res) => {
    try {
        await res.publisher.remove()
        res.json({ message: 'Deleted Publisher' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getPublisher(req, res, next) {
    let publisher
    try {
        publisher = await Publisher.findById(req.params.id)
        if (publisher == null) {
            return res.status(404).json({ message: 'Cannot find Publisher' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.publisher = publisher
    next()
}

module.exports = router