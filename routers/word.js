const express = require('express');
const Word = require('../db/models/word.js');
const router = express.Router();

function validLanguage(language) {
     if (!language) {
          return true;
     }
     return ['en', 'de'].includes(language);
}

router
     .route('/')
     .get(function(req, res) {
          Word.find(function(err, words) {
               if (err) {
                    res.send(err);
               } else {
                    res.json({
                         message: 'Words found!',
                         words,
                    });
               }
          });
     })
     .post(function(req, res) {
          let { word, definition, language } = req.body;
          console.log(word, definition);
          if (!word || !definition || !validLanguage(language)) {
               res.status(400).json({
                    message: 'Wrong format provided!',
               });
               return;
          }
          let wordObj = new Word();
          wordObj.word = word;
          wordObj.definition = definition;
          wordObj.language = language;
          wordObj.save(function(err) {
               if (err) {
                    res.send(err);
               } else {
                    res.json({
                         message: 'Word created!',
                         word: wordObj,
                    });
               }
          });
     });

router.route('/random').get(function(req, res) {
     Word.countDocuments().exec(function(err, count) {
          if (count === 0) {
               res.json({
                    message: 'No word found!',
               });
               return;
          }
          const random = Math.floor(Math.random() * count);
          Word.findOne()
               .skip(random)
               .exec(function(err, result) {
                    if (err) {
                         res.send(err);
                    } else {
                         res.json({
                              message: 'Random word found!',
                              result,
                         });
                    }
               });
     });
});

router.route('/random/:lang').get(function(req, res) {
     Word.countDocuments({ language: req.params.lang }).exec(function(err, count) {
          const random = Math.floor(Math.random() * count);
          if (count === 0) {
               res.json({
                    message: 'No word for provided language found!',
               });
               return;
          }
          Word.findOne({ language: req.params.language })
               .skip(random)
               .exec(function(err, result) {
                    if (err) {
                         res.send(err);
                    } else {
                         res.json({
                              message: 'Random word found!',
                              result,
                         });
                    }
               });
     });
});

router
     .route('/:word_id')
     .get(function(req, res) {
          Word.findById(req.params.word_id, function(err, word) {
               if (err) {
                    res.send(err);
               } else {
                    res.json({
                         message: 'Word found!',
                         word,
                    });
               }
          });
     })
     .put(function(req, res) {
          Word.findById(req.params.word_id, function(err, word) {
               if (err) {
                    res.send(err);
               } else {
                    word.word = req.body.word;
                    word.definition = req.body.definition;
                    word.language = req.body.language;

                    word.save(function(e) {
                         if (e) {
                              res.send(e);
                         } else {
                              res.json({
                                   message: 'Word updated!',
                                   word,
                              });
                         }
                    });
               }
          });
     })
     .delete(function(req, res) {
          Word.findById(req.params.word_id, function(err, word) {
               if (err) {
                    res.send(err);
               } else {
                    word.remove(function(e) {
                         if (e) {
                              res.send(e);
                         } else {
                              res.json({
                                   message: 'Word removed!',
                                   word,
                              });
                         }
                    });
               }
          });
     });

module.exports = router;
