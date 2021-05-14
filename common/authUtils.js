const needsAuthorization = ['POST', 'PUT', 'DELETE'];
const { apiKey } = require('../config');

const clientApiKeyValidation = (req, res, next) => {
     if (!needsAuthorization.includes(req.method)) {
          next();
          console.log('Called next');
          return;
     }
     let clientApiKey = req.get('x-api-key');
     console.log('Start');
     if (!clientApiKey) {
          console.log('key missing');
          return res.status(400).send({
               message: 'Missing Api Key',
          });
     }
     console.log('searched', apiKey);
     console.log('client', clientApiKey);
     if (apiKey === clientApiKey) {
          next();
          return;
     }
     return res.status(400).send({
          message: 'Invalid Api Key',
     });
};

module.exports = { clientApiKeyValidation };
