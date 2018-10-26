import React from "react";

const StartWeather = props => {
  const { sun1, precipitation1, temp1, windChill1 } = props;

  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="cloudiness">{sun1}</p>
      <h5>
        <u>Chance of Precipitation at Start</u>
      </h5>
      <p id="raininess">{precipitation1}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="temp">{temp1}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="windiness">{windChill1}</p>
    </ul>
  );
};

export default StartWeather;
