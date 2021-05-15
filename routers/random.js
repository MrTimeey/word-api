const express = require('express');
const Word = require('../db/models/word.js');
const router = express.Router();
const { validLanguage } = require('../common/languageUtils');

router.route('/').get(function(req, res) {
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
               .exec(sendRandomWordResult(res));
     });
});

router.route('/:lang').get(function(req, res) {
     if (!validLanguage(req.params.lang)) {
          res.status(400).json({
               message: 'Invalid language!',
          });
          return;
     }
     Word.countDocuments({ language: [req.params.lang] }).exec(function(err, count) {
          if (count === 0) {
               res.json({
                    message: 'No word found for provided language!',
               });
               return;
          }
          const random = Math.floor(Math.random() * count);
          Word.findOne({ language: req.params.lang })
               .skip(random)
               .exec(sendRandomWordResult(res));
     });
});

function sendRandomWordResult(res) {
     return function(err, result) {
          if (err) {
               res.send(err);
          } else {
               res.json({
                    message: 'Random word found!',
                    result,
               });
          }
     };
}

module.exports = router;
