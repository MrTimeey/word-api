const moment = require('moment');
const momentDurationFormatSetup = require('moment-duration-format');

function currentTimestamp() {
     return moment(new Date()).format('DD.MM.YYYY - HH:mm:ss (Z)');
}

function formatSeconds(sec) {
     const duration = moment.duration(sec, 'seconds');
     return duration.format('dd[d] hh[h] mm[m] ss[s]');
}

module.exports = {
     currentTimestamp,
     formatSeconds,
};
