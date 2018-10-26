import React from "react";

const EndWeather = props => {
  const { sun2, precipitation2, temp2, windChill2 } = props;
  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="end-cloudiness">{sun2}</p>
      <h5>
        <u>Chance of Precipitation at End</u>
      </h5>
      <p id="end-raininess">{precipitation2}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="end-temp">{temp2}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="end-windiness">{windChill2}</p>
    </ul>
  );
};

export default EndWeather;
