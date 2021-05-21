const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { clientApiKeyValidation } = require('./src/common/authUtils');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/word_spec.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

router.use(clientApiKeyValidation);

router.use(function(req, res, next) {
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

app.use('/api', router);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: false }));

module.exports = app;
