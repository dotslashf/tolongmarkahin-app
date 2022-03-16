const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');
require('dayjs/locale/id');
dayjs.extend(relativeTime);

module.exports = {
  formatDate: function (date) {
    return dayjs().locale('id').to(date);
  },
};
