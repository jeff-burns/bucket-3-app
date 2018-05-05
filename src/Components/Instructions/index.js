import React from "react";

const Instructions = () => {
  return (
    <div className="card mb-3">
      <h3 className="card-header">INSTRUCTIONS</h3>
      <div className="card-body">
        <p className="card-text">
          <strong>Quick Instructions</strong>
        </p>
        <p>
          Pick start location and time, then end location and time (using
          military time).
        </p>
        <p>
          Please make sure to type the city and state in the exact formatting
          the examples show.
        </p>
        <a
          href=""
          data-toggle="tooltip"
          title="Pick a spot near the midpoint of your ride and use that as your endpoint."
        >
          (Start & End Points the Same?)
        </a>
      </div>
    </div>
  );
};

export default Instructions;
// <div className="d-flex flex-row">

// style={width 33.33%}
