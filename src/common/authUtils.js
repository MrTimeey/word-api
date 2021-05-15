const needsAuthorization = ['POST', 'PUT', 'DELETE'];
const { apiKey } = require('../../config');

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

module.exports = { clientApiKeyValidation };
