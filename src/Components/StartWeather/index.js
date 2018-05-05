import React from "react";

const StartWeather = props => {
  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="cloudiness">{props.fillStart.sun}</p>
      <h5>
        <u>Chance of Precipitation at Start</u>
      </h5>
      <p id="raininess">{props.fillStart.precipitation}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="temp">{props.fillStart.temp}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="windiness">{props.fillStart.windChill}</p>
    </ul>
  );
};

export default StartWeather;
