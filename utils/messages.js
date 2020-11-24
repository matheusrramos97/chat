const moment = require('moment');

function FormatMessage(UserName, MSG) {
  return {
    UserName,
    MSG,
    Time: moment().format('h:mm a')
  };
}

module.exports = FormatMessage;