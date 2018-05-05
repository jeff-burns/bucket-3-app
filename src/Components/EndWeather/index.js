import React from "react";

const EndWeather = props => {
  return (
    <ul className="list-group list-group-flush">
      <h5>
        <u>Sunny/Cloudy</u>
      </h5>
      <p id="end-cloudiness">{props.fillEnd.sun}</p>
      <h5>
        <u>Chance of Precipitation at End</u>
      </h5>
      <p id="end-raininess">{props.fillEnd.precipitation}</p>
      <h5>
        <u>Temperature</u>
      </h5>
      <p id="end-temp">{props.fillEnd.temp}</p>
      <h5>
        <u>Wind Chill</u>
      </h5>
      <p id="end-windiness">{props.fillEnd.windChill}</p>
    </ul>
  );
};

export default EndWeather;
