var getIndex = require("./algoliaclient");

var algoliaCb = (err, content) => {
  if (err) console.log("error: " + err);
  else console.log(content);
};

var algoliaHooksWrapper = (schema, indexName) => {
  index = getIndex(indexName);

  schema.post("save", doc => {
    index.addObject({ ...doc.toObject(), objectID: doc._id }, algoliaCb);
  });

  schema.post("remove", doc => {
    index.deleteObject(doc._id, algoliaCb);
  });

  // TODO: add update, findOneAndUpdate, findOneAndRemove hooks?
};

module.exports = algoliaHooksWrapper;
