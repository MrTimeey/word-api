const express = require('express');
const Word = require('../db/models/word.js');
const router = express.Router();
const { validLanguage } = require('../common/languageUtils');

router.route('/').get(function(req, res) {
     const searchedWord = req.query.word;
     if (!searchedWord) {
          res.status(400).json({
               message: 'Query parameter not present!',
          });
          return;
     }
     Word.findOne({ word: searchedWord }, function(err, word) {
          if (err) {
               res.send(err);
          } else {
               const msg = word ? 'Word found!' : 'No matching word found!';
               res.json({
                    message: msg,
                    word,
               });
          }
     });
});

module.exports = router;
