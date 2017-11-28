import React, { Component } from "react";

// export default ({ drug }) => (
//   <div>
//     <span>{drug.name}</span>
//     <span
//     >{`${drug.frequency}, ${drug.dosage}, ${drug.duration}, ${drug.specialComments}`}</span>
//   </div>
// );

export default ({ drug }) => (
  <div>
    <h5>{drug.name}</h5>
    <div>
      {drug.composition ? (
        <small className="text-muted">({drug.composition.join(", ")})</small>
      ) : (
        <div />
      )}
    </div>
  </div>
);
