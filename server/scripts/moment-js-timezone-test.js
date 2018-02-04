var moment = require("moment-timezone");

var x = moment(new Date(1512066600000));
console.log(x.tz("Asia/Kolkata").format("MM-DD-YYYY"));
