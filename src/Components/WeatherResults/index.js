// import React from "react";

// import StartWeather from "../StartWeather";
// import EndWeather from "../EndWeather";

// const WeatherResults = props => {
  // const starting = props.weather.map(weather => {
  //   return (
  //     <StartWeather
  //       sun={weather.hourly_forecast[0].condition}
  //       precipitation={weather.hourly_forecast[0].qpf.english}
  //       temp={weather.hourly_forecast[0].temp.english}
  //       windChill={weather.hourly_forecast[0].feelslike.english}
  //     />
  //   );
  // });

  // const ending = props.getRouteEndData.map(weather => {
  //   return (
  //     <EndWeather
  //       sun={weather.response.hourly_forecast[1].condition}
  //       precipitation={weather.response.hourly_forecast[1].qpf.english}
  //       temp={weather.response.hourly_forecast[1].temp.english}
  //       windChill={weather.response.hourly_forecast[1].feelslike.english}
  //     />
  //   );
  // });

//   return (
//     <div className="card mb-3">
//       <h3 className="card-header">WEATHER</h3>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item">
//           <strong>Start of Route Weather</strong>
//         </li>
//         <section id="results-start-weather">{starting}</section>
//         <li className="list-group-item">
//           <strong>End of Route Weather</strong>
//         </li>
//         <section id="results-end-weather">{ending}</section>
//       </ul>
//     </div>
//   );
// };

// export default WeatherResults;
