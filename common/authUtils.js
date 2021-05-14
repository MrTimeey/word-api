const needsAuthorization = ['POST', 'PUT', 'DELETE'];
const { apiKey } = require('../config');

const clientApiKeyValidation = (req, res, next) => {
     if (!needsAuthorization.includes(req.method)) {
          next();
          return;
     }
     let clientApiKey = req.get('x-api-key');
     if (!clientApiKey) {
          return res.status(400).send({
               message: 'Missing Api Key',
          });
     }
     if (apiKey === clientApiKey) {
          next();
          return;
     }
     return res.status(400).send({
          message: 'Invalid Api Key',
     });
};

function getValidApiKey(req) {
     console.log(process.env.TEST_FLAG, process.env.TEST_FLAG && process.env.TEST_FLAG === 'test');
     if (process.env.TEST_FLAG && process.env.TEST_FLAG === 'test') {
          console.log('use fake key');
          return 'api-key';
     }
     console.log('whoop');
     return req.get('x-api-key');
}

module.exports = { clientApiKeyValidation };
