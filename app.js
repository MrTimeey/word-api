const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const marked = require('marked');
const { clientApiKeyValidation } = require('./src/common/authUtils');
const { readFileAsync } = require('./src/common/fileUtils');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

router.use(clientApiKeyValidation);

router.use(function(req, res, next) {
     /*console.log('Something is happening!');*/
     next();
});

router.get('/', function(req, res) {
     res.json({ message: 'Hooray! Welcome to the API!' });
});

router.use('/words', require('./src/routers/word.js'));
router.use('/batch', require('./src/routers/batch.js'));
router.use('/random', require('./src/routers/random.js'));
router.use('/search', require('./src/routers/search'));
router.use('/health', require('./src/routers/healthcheck'));

app.get('/', async (req, res) => {
     const file = await readFileAsync('README.md', 'utf8');
     res.send(marked(file.toString()));
});

app.use('/api', router);

module.exports = app;
