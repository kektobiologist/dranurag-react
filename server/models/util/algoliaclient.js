var algoliasearch = require("algoliasearch");

var client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_SERVER_APIKEY
);

var getIndex = str => client.initIndex(str);

module.exports = getIndex;
