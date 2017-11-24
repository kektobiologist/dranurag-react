import { fieldValues } from "./DrugData";
import _ from "lodash";
var durationConverter = str => {
  var strs = str.split(" ");
  if (strs.length < 2) {
    // weird case of '5' or empty
    return null;
  }
  return { number: String(parseInt(strs[0])), type: strs[1] };
};

var count = 0;
export default drugMeta => {
  var drug = {
    name: drugMeta.name,
    id: drugMeta.id,
    // should have initial values of frequency, dosage etc.
    drugMeta: {
      // generate a string to act as flipmove key for this object
      flipMoveKey: count++,
      composition: drugMeta.composition
      // should have frequencies etc.
    }
  };
  var keys = [
    ["frequencies", "frequency"],
    ["dosages", "dosage"],
    ["durations", "duration"],
    ["specialComments", "specialComments"]
  ];
  keys.forEach(([str, key]) => {
    drug.drugMeta[str] = _.sortBy(
      fieldValues[str].map(val => {
        var temp;
        if ((temp = _.find(drugMeta[str], { val: val })))
          return { val: val, count: temp.count };
        else return { val: val, count: 0 };
      }),
      [o => -o.count, o => o.val]
    );
  });
  keys.forEach(([str, key]) => {
    if (drug.drugMeta[str][0].count) drug[key] = drug.drugMeta[str][0].val;
  });
  delete drug.duration;
  var duration = durationConverter(drug.drugMeta.durations[0].val);
  if (drug.drugMeta.durations[0].count && duration) {
    drug.duration = duration;
  } else {
    drug.duration = { number: "1", type: "days" };
  }
  return drug;
};
