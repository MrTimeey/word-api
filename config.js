const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
     throw result.error;
}

const mongoDbAuth = `${process.env.MONGO_DB_USER}:${encodeURIComponent(process.env.MONGO_DB_PASSWORD)}`;
const mongoDbInstance = `${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`;
const mongoDbUrl = `mongodb://${mongoDbAuth}@${mongoDbInstance}`;

function getApiKey() {
     if (process.env.TEST_FLAG && process.env.TEST_FLAG === 'test') {
          return 'api-key';
     }
     return process.env.API_KEY;
}

module.exports = {
     port: process.env.PORT || 3000,
     environment: process.env.NODE_ENV || 'unknown',
     mongoUrl: mongoDbUrl,
     apiKey: getApiKey(),
};
