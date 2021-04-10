const express = require('express')
const app = express()
const mongoose = require('mongoose')


app.use(express.json())

const url = "mongodb://127.0.0.1:27017/test?compressors=zlib&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass&ssl=false";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


const booksRouter = require('./routes/books')
app.use('/books', booksRouter)
const publishersRouter = require('./routes/publishers')
app.use('/publishers', publishersRouter)


app.listen(3000, () => console.log('Server Started'))