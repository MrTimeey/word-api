const mongoose = require('mongoose');

let schema = mongoose.Schema;
let WordSchema = new schema({
     word: String,
     definition: String,
     language: {
          type: String,
          enum: ['de', 'en'],
          default: 'en',
     },
});

module.exports = mongoose.model('Word', WordSchema);
