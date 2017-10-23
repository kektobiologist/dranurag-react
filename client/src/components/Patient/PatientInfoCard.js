import React from "react";

export default ({ patient }) => {
  return (
    <div>
      <h3>{patient.name} </h3>
      <div>ID: {patient._id}</div>
    </div>
  );
};
