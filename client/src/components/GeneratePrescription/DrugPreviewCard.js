import React, { Component } from "react";

export default ({ drug }) => (
  <div>
    <span>{drug.name}</span>
    <span
    >{`${drug.frequency}, ${drug.dosage}, ${drug.duration}, ${drug.specialComments}`}</span>
  </div>
);
