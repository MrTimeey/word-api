const mongoose = require('mongoose');
const { mongoUrl } = require('../config/config');
const TEST_DB_URI = 'mongodb://localhost:27017/dinos';

function connect() {
     return new Promise((resolve, reject) => {
          if (process.env.TEST_FLAG && process.env.TEST_FLAG === 'test') {
               const Mockgoose = require('mockgoose').Mockgoose;
               const mockgoose = new Mockgoose(mongoose);

               mockgoose.prepareStorage().then(() => {
                    mongoose.connect(TEST_DB_URI, { useNewUrlParser: true, useCreateIndex: true }).then((res, err) => {
                         if (err) return reject(err);
                         resolve();
                    });
               });
          } else {
               mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true }).then((res, err) => {
                    if (err) return reject(err);
                    resolve();
               });
          }
     });
}

function close() {
     return mongoose.disconnect();
}

module.exports = { connect, close };
