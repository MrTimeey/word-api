const express = require('express');
const router = express.Router();
const { promisify } = require('util');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

async function getFile(name) {
     return readFileAsync(__dirname + '../../../api-doc/' + name);
}

router.route('/openapi.json').get(async function(req, res) {
     const [file] = await Promise.all([getFile('openapi.json')]);
     res.setHeader('Content-Type', 'application/json');
     res.send(file.toString());
});
router.route('/openapi.yaml').get(async function(req, res) {
     const [file] = await Promise.all([getFile('openapi.yaml')]);
     res.setHeader('Content-Type', 'application/json');
     res.send(file.toString());
});
router.route('/swagger.json').get(async function(req, res) {
     const [file] = await Promise.all([getFile('swagger.json')]);
     res.setHeader('Content-Type', 'application/json');
     res.send(file.toString());
});
router.route('/swagger.yaml').get(async function(req, res) {
     const [file] = await Promise.all([getFile('swagger.yaml')]);
     res.setHeader('Content-Type', 'application/json');
     res.send(file.toString());
});

module.exports = router;
