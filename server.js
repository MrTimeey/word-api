const app = require('./app.js');
const db = require('./src/db/index.js');
const { environment, port } = require('./src/config/config');

db.connect().then(() => {
     app.listen(port, () => {
          console.log('Enjoy new words on port ' + port);
          console.log('Started with environment: ' + environment);
     });
});
