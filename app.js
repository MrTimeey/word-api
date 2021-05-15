const express = require('express');
const bodyParser = require('body-parser');
const wordRouter = require('./src/routers/word.js');
const batchWordRouter = require('./src/routers/batch.js');
const randomWordRouter = require('./src/routers/random.js');
const { clientApiKeyValidation } = require('./src/common/authUtils');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.use(clientApiKeyValidation);

router.use(function(req, res, next) {
     console.log('Something is happening!');
     next();
});

router.get('/', function(req, res) {
     res.json({ message: 'Hooray! Welcome to the API!' });
});

router.use('/words', wordRouter);
router.use('/batch', batchWordRouter);
router.use('/random', randomWordRouter);

app.use('/api', router);

module.exports = app;
