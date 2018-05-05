import React, { Component } from "react";

import StartTime from "../StartTime";
import EndTime from "../EndTime";
import StartWeather from "../StartWeather";
import EndWeather from "../EndWeather";
import timeIndices from "./utils";

const inputData = {
  startCity: "",
  startState: "",
  startZip: "",
  endCity: "",
  endState: "",
  endZip: ""
};
const inputNames = Object.getOwnPropertyNames(inputData);

class RouteTimesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [...inputNames],
      startTime: 0,
      endTime: 0
    };

    this.getRouteStartData = this.getRouteStartData.bind(this);
    this.getRouteEndData = this.getRouteEndData.bind(this);
  }

  onSubmit = event => {
    event.preventDefault();
    this.handlePlaces(event);
    this.handleTimes(event);
  };

  handlePlaces = event => {
    event.preventDefault();

    let returnObj = {};

    inputNames.forEach(name => {
      returnObj[name] = event.target[name].value;
    });

    let newState = [...returnObj];

    this.setState({
      data: newState
      // startTime: startHour,
      // endTime: endHour
    });
  };

  handleTimes = event => {
    event.preventDefault();

    const startIndex = event.target["start-time"].selectedIndex;
    const getStartIndexForHour = timeIndices[startIndex];

    const endIndex = event.target["end-time"].selectedIndex;
    const getEndIndexForHour = timeIndices[endIndex];

    this.setState({
      startTime: getStartIndexForHour,
      endTime: getEndIndexForHour
    });
  };

  getRouteStartData = () => {
    const startHourlyUrl = `http://api.wunderground.com/api/2b572770b27d6c40/hourly/q/${
      this.state.startState
    }/${this.state.startCity}/${this.state.startZip}.json`;

    fetch(startHourlyUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          weatherStart: data
        });
        // const starting =
        debugger;
        this.state.weatherStart.map(weather => {
          return (
            <StartWeather
              sun={weather.hourly_forecast[this.state.startTime].condition}
              precipitation={
                weather.hourly_forecast[this.state.startTime].qpf.english
              }
              temp={weather.hourly_forecast[this.state.startTime].temp.english}
              windChill={
                weather.hourly_forecast[this.state.startTime].feelslike.english
              }
            />
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getRouteEndData = () => {
    const endUrl = `http://api.wunderground.com/api/2b572770b27d6c40/hourly/q/${
      this.state.endState
    }/${this.state.endCity}/${this.state.endZip}.json`;

    fetch(endUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          weatherEnd: data
        });
        this.state.weatherEnd.map(weather => {
          return (
            <EndWeather
              sun={weather.hourly_forecast[this.state.endTime].condition}
              precipitation={
                weather.hourly_forecast[this.state.endTime].qpf.english
              }
              temp={weather.hourly_forecast[this.state.endTime].temp.english}
              windChill={
                weather.hourly_forecast[this.state.endTime].feelslike.english
              }
            />
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { startCity, startState, startZip, startTime } = this.state;
    return (
      <div>
        <div className="card mb-3">
          <h3 className="card-header">ROUTE & TIMES</h3>
          <ul className="list-group list-group-flush">
            <form className="form" onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <label htmlFor="search">Starting City</label>
                <input
                  type="text"
                  className="form-control"
                  id="start-city"
                  name="startCity"
                  value={startCity}
                  placeholder="Denver"
                />
                <label htmlFor="search">Starting State</label>
                <input
                  type="text"
                  className="form-control"
                  id="start-state"
                  name="startState"
                  value={startState}
                  placeholder="CO"
                />
                <label htmlFor="search">Starting ZipCode</label>
                <input
                  type="text"
                  className="form-control"
                  id="start-zip"
                  name="startZip"
                  value={startZip}
                  placeholder="80210"
                />
                <div className="card-header" />

                <StartTime convertTime1={startTime} />
                <div className="card-header" />

                <label htmlFor="search">Ending City</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-city"
                  name="endCity"
                  value={this.state.endCity}
                  placeholder="Denver"
                />
                <label htmlFor="search">Ending State</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-state"
                  name="endState"
                  value={this.state.endState}
                  placeholder="CO"
                />
                <label htmlFor="search">Ending ZipCode</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-zip"
                  name="endZip"
                  value={this.state.endZip}
                  placeholder="80202"
                />
                <div className="card-header" />

                <EndTime convertTime2={this.state.endTime} />

                <div className="card-header" />
              </div>
              <button
                id="submit-button"
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Search
              </button>
            </form>
          </ul>
        </div>
        <div className="card mb-3">
          <h3 className="card-header">WEATHER</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Start of Route Weather</strong>
            </li>
            <section id="results-start-weather">
              <StartWeather fillStart={this.getRouteStartData} />
            </section>
            <li className="list-group-item">
              <strong>End of Route Weather</strong>
            </li>
            <section id="results-end-weather">
              <EndWeather fillEnd={this.getRouteEndData} />
            </section>
          </ul>
        </div>
      </div>
    );
  }
}

export default RouteTimesForm;

// this.handleSubmit = this.handleSubmit.bind(this);
// this.handleSubmit()
