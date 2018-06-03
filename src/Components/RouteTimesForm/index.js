import React, { Component } from "react";

import StartTime from "../StartTime";
import EndTime from "../EndTime";
import StartWeather from "../StartWeather";
import EndWeather from "../EndWeather";
import timeIndices from "./utils";

class RouteTimesForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startWeather: {},
      endWeather: {},
      startCity: "",
      startState: "",
      startZip: "",
      endCity: "",
      endState: "",
      endZip: "",
      userName: "",
      // autoFillStartCity: "",
      // autoFillStartState: "",
      // autoFillStartZip: "",
      // autoFillEndCity: "",
      // autoFillEndState: "",
      // autoFillEndZip: "",
      userBeingFilled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoFill = this.handleAutoFill.bind(this);
    this.isbeingfilled = this.isbeingfilled.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
    this.isbeingfilled();
  }

  isbeingfilled() {
    const user = this.state.userName;
    if (user !== "") {
      this.setState({
        userBeingFilled: true
      });
      console.log(user);
    }
  }

  handleAutoFill(resp) {
    if (this.state.userBeingFilled === true) {
      const user = this.state.userName;

      fetch(`http://localhost:3000/userinput/${user}`)
        .then(response => {
          return response.json();
        })
        .then(resp => {
          console.log(resp);
          // this.handleAutoFill(resp)
          let autoFillState = 
            resp.user
            // startCity: resp.user.startCity,
            // startState: resp.user.startState,
            // startZip: resp.user.startZip,
            // endCity: resp.user.endCity,
            // endState: resp.user.endState,
            // endZip: resp.user.endZip
          ;
          // console.log(autoFill)
          this.setState({ ...autoFillState });
          console.log(this.state);
        });
    }
  }

  // handleAutoFill(resp) {
  //   // event.preventDefault()
  //   console.log(this.state.userName)
  //   const user = this.state.userName
  // // if (user !== "") {
  //   // running a check on the userInput table
  //   // if there, autofill form
  //   // this.setState({
  //   //   [name]: value
  //   // });
  //   fetch(`http://localhost:3000/userinput/${user}`)
  //   .then(response => {
  //     return response.json();
  //   })
  //   .then(resp => {
  //     console.log(resp);
  //     // this.handleAutoFill(resp)
  //     let autoFill = resp.user
  //     console.log(autoFill.startZip)
  //     this.setState({
  //       autoFillStartCity: autoFill.startCity,
  //       autoFillStartState: autoFill.startState,
  //       autoFillStartZip: autoFill.startZip,
  //       autoFillEndCity: autoFill.endCity,
  //       autoFillEndState: autoFill.endState,
  //       autoFillEndZip: autoFill.endZip
  //      })
  //      console.log(this.state)
  //   })
  // }

  // const autoFill = {
  //   startCity: resp.user.startCity,
  //   startState: resp.user.startState,
  //   startZip: resp.user.startZip,
  //   endCity: resp.user.endCity,
  //   endState: resp.user.endState,
  //   endZip: resp.user.endZip
  // }

  handleSubmit(event) {
    event.preventDefault();
    const formData = {
      startCity: this.state.startCity,
      startState: this.state.startState,
      startZip: this.state.startZip,
      endCity: this.state.endCity,
      endState: this.state.endState,
      endZip: this.state.endZip,
      userName: this.state.userName
    };
    console.log(formData);
    const { startTimeIndex, endTimeIndex } = this.handleTimes(event);
    this.updateWeatherData({ formData, startTimeIndex, endTimeIndex });
  }

  handleTimes(event) {
    event.preventDefault();

    const startIndex = event.target["start-time"].selectedIndex;
    const getStartIndexForHour = timeIndices[startIndex];

    const endIndex = event.target["end-time"].selectedIndex;
    const getEndIndexForHour = timeIndices[endIndex];
    console.log(getStartIndexForHour);

    return {
      startTimeIndex: getStartIndexForHour,
      endTimeIndex: getEndIndexForHour
    };
  }

  updateWeatherData({ formData, startTimeIndex, endTimeIndex }) {
    this.getStartData({ formData, startTimeIndex });
    this.getEndData({ formData, endTimeIndex });
    //logs the user inputs for city, state, zip
    console.log(this.state);
    //fetch(userInput table, POST)
  }

  getStartData({ formData, startTimeIndex }) {
    const startHourlyUrl = `https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/f2ac151de86fd0ea/hourly/q/${
      formData.startState
    }/${formData.startCity}/${formData.startZip}.json`;
    //

    fetch(startHourlyUrl)
      .then(response => {
        return response.json();
      })
      .then(resp => {
        console.log(resp);
        const weather = resp.hourly_forecast[startTimeIndex];
        const sun = weather.condition;
        const precipitation = weather.qpf.english;
        const temp = weather.temp.english;
        const windChill = weather.feelslike.english;
        const propsWeather = { sun, precipitation, temp, windChill };
        console.log(propsWeather);
        this.setState({
          startWeather: propsWeather
        });
      })
      .catch(error => {
        console.log(error);
      });
    //fetch(weathers table, POST)
  }
  getEndData({ formData, endTimeIndex }) {
    const hourlyUrl = `https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/f2ac151de86fd0ea/hourly/q/${
      formData.endState
    }/${formData.endCity}/${formData.endZip}.json`;
    //

    fetch(hourlyUrl)
      .then(response => {
        return response.json();
      })
      .then(resp => {
        const weather = resp.hourly_forecast[endTimeIndex];
        const sun = weather.condition;
        const precipitation = weather.qpf.english;
        const temp = weather.temp.english;
        const windChill = weather.feelslike.english;
        const propsWeather = { sun, precipitation, temp, windChill };
        this.setState({
          endWeather: propsWeather
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);

    const startWeather = this.state.startWeather;
    const endWeather = this.state.endWeather;

    return (
      <div>
        <div className="card mb-3">
          <h3 className="card-header">ROUTE & TIMES</h3>
          <ul className="list-group list-group-flush">
            <form className="form" onSubmit={event => this.handleSubmit(event)}>
              <div className="form-group">
                <label htmlFor="search">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  name="userName"
                  value={this.state.userName}
                  placeholder="Name"
                  onChange={this.handleChange}
                  isbeingfilled={this.isbeingfilled}
                  onBlur={this.handleAutoFill}
                />

                <label htmlFor="search">Starting City</label>

                {this.state.userBeingFilled === true ? (
                  <input
                    type="text"
                    className="form-control"
                    id="start-city"
                    name="startCity"
                    value={this.state.autoFillStartCity}
                    placeholder="Denver"
                    onChange={this.handleChange}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id="start-city"
                    name="startCity"
                    value={this.state.startCity}
                    placeholder="Denver"
                    onChange={this.handleChange}
                  />
                )}
                <label htmlFor="search">Starting State</label>
                <input
                  type="text"
                  className="form-control"
                  id="start-state"
                  name="startState"
                  value={this.state.startState}
                  placeholder="CO"
                  onChange={this.handleChange}
                />
                <label htmlFor="search">Starting ZipCode</label>

                {this.state.userbeingfilled === true ? (
                  <input
                    type="text"
                    className="form-control"
                    id="start-zip"
                    name="startZip"
                    value={this.state.autoFillStartZip}
                    placeholder="80210"
                    onChange={this.handleChange}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    id="start-zip"
                    name="startZip"
                    value={this.state.startZip}
                    placeholder="80210"
                    onChange={this.handleChange}
                  />
                )}
                <div className="card-header" />

                <StartTime />
                <div className="card-header" />

                <label htmlFor="search">Ending City</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-city"
                  name="endCity"
                  value={this.state.endCity}
                  placeholder="Denver"
                  onChange={this.handleChange}
                />
                <label htmlFor="search">Ending State</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-state"
                  name="endState"
                  value={this.state.endState}
                  placeholder="CO"
                  onChange={this.handleChange}
                />
                <label htmlFor="search">Ending ZipCode</label>
                <input
                  type="text"
                  className="form-control"
                  id="end-zip"
                  name="endZip"
                  value={this.state.endZip}
                  placeholder="80202"
                  onChange={this.handleChange}
                />
                <div className="card-header" />

                <EndTime />

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
              <StartWeather {...startWeather} />
            </section>
            <li className="list-group-item">
              <strong>End of Route Weather</strong>
            </li>
            <section id="results-end-weather">
              <EndWeather {...endWeather} />
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
