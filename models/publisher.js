const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const publisherSchema = new Schema({
    name: { type: String, required: true },
    founded: { type: Date, required: true },
    location: { type: String, required: true },
});


module.exports = mongoose.model('Publisher', publisherSchema);