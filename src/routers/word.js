const express = require('express');
const Word = require('../db/models/word.js');
const router = express.Router();
const { validLanguage } = require('../common/languageUtils');

/**
 * @swagger
 * /words:
 *   get:
 *     summary: Retrieve a list of words
 *     description: Retrieve a list of words from the DB.
 */
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
