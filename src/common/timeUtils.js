const moment = require('moment');

function currentTimestamp() {
     return moment(new Date()).format('DD.MM.YYYY - HH:mm:ss');
}

function formatSeconds(sec) {
     function pad(s) {
          return (s < 10 ? '0' : '') + s;
     }
     const days = Math.floor(sec / (60 * 60 * 24));
     const hours = Math.floor(sec / (60 * 60));
     const minutes = Math.floor((sec % (60 * 60)) / 60);
     const seconds = Math.floor(sec % 60);

     return pad(days) + 'd ' + pad(hours) + 'h ' + pad(minutes) + 'm ' + pad(seconds) + 's';
}

module.exports = {
     currentTimestamp,
     formatSeconds,
};
