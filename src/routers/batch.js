const express = require('express');
const Word = require('../db/models/word.js');
const router = express.Router();
const { validLanguage } = require('../common/languageUtils');

router.route('/create_all').post(function(req, res) {
     const { words } = req.body;
     let inserted = [];
     let failed = [];
     const promises = [];
     words.forEach(w => {
          let { word, definition, language } = w;
          if (!word || !definition || !validLanguage(language)) {
               failed.push(w);
               return;
          }
          let wordObj = new Word();
          wordObj.word = word;
          wordObj.definition = definition;
          wordObj.language = language;
          promises.push(
               wordObj
                    .save()
                    .then(function(savedWord) {
                         inserted.push(wordObj);
                    })
                    .catch(function(err) {
                         failed.push(wordObj);
                    })
          );
     });
     Promise.all(promises).then(() =>
          res.json({
               message: 'Words created!',
               created: inserted,
               failed: failed,
          })
     );
});

router.route('/delete_all').delete(function(req, res) {
     Word.remove({}, function(err) {
          if (err) {
               res.json({
                    message: 'Failed to delete everything!',
               });
          } else {
               res.json({
                    message: 'Deleted all words!',
               });
          }
     });
});

module.exports = router;
