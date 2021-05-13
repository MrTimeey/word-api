const express = require('express');
const bodyParser = require('body-parser');
const wordRouter = require('./routers/word.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.use(function(req, res, next) {
     console.log('Something is happening!');
     next();
});

router.get('/', function(req, res) {
     res.json({ message: 'Hooray! Welcome to the API!' });
});

router.use('/words', wordRouter);

app.use('/api', router);

module.exports = app;
