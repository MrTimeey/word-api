const express = require('express');
const router = express.Router();
const { currentTimestamp, formatSeconds } = require('../common/timeUtils');

router.get('/', async (_req, res, _next) => {
     const healthcheck = {
          uptime: formatSeconds(process.uptime()),
          message: 'OK',
          timestamp: currentTimestamp(),
     };
     try {
          res.send(healthcheck);
     } catch (e) {
          healthcheck.message = e;
          res.status(503).send();
     }
});

module.exports = router;
