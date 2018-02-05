var moment = require("moment-timezone");
moment.tz.setDefault("Africa/Tripoli");

var moment2 = require("moment");
var x = moment2(new Date(1512066600000));
console.log(x.format("MM-DD-YYYY"));
