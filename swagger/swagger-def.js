module.exports = {
     openapi: '3.0.0',
     info: {
          title: 'Word Express API',
          version: '0.1.0',
          description: 'An API for retrieving and saving words',
          license: {
               name: 'Licensed Under MIT',
               url: 'https://github.com/MrTimeey/word-api/blob/main/LICENSE',
          },
          contact: {
               name: 'GitHub',
               url: 'https://github.com/MrTimeey/word-api',
          },
     },
     servers: [
          {
               url: 'https://word-of-the-day.de/api',
               description: 'Production server',
          },
     ],
};
