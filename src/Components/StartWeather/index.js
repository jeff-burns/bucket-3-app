import React from "react";

const StartWeather = props => {
  const { sun, precipitation, temp, windChill } = props;

  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="cloudiness">{sun}</p>
      <h5>
        <u>Chance of Precipitation at Start</u>
      </h5>
      <p id="raininess">{precipitation}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="temp">{temp}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="windiness">{windChill}</p>
    </ul>
  );
};

export default StartWeather;
