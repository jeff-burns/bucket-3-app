import React from "react";

const EndWeather = props => {
  const { sun, precipitation, temp, windChill } = props;
  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="end-cloudiness">{sun}</p>
      <h5>
        <u>Chance of Precipitation at End</u>
      </h5>
      <p id="end-raininess">{precipitation}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="end-temp">{temp}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="end-windiness">{windChill}</p>
    </ul>
  );
};

export default EndWeather;
