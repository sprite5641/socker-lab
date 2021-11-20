const dayjs = require('dayjs');

exports.formatMessage = (username, text) => {
  return {
    username,
    text,
    time: dayjs().format('hh:mm:dd')
  };
}
