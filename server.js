const app = require('./app.js');
const db = require('./db/index.js');
const { environment, port } = require('./config');

db.connect().then(() => {
     app.listen(port, () => {
          console.log('Play with dinosaurs on port ' + port);
          console.log('Started with environment: ' + environment);
     });
});