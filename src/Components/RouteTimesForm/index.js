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
      userBeingFilled: false,
      previousUserChecked: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAutoFill = this.handleAutoFill.bind(this);
    this.isbeingfilled = this.isbeingfilled.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    }
  }

  handleClick(event) {
    event.preventDefault();
    if (event.target.checked) {
      this.setState({
        previousUserChecked: true
      });
    }
  }

  handleAutoFill(resp) {
    if (this.state.userBeingFilled === true) {
      const user = this.state.userName;

      fetch(`https://agile-thicket-79673.herokuapp.com/userinput/${user}`)
        .then(response => {
          return response.json();
        })
        .then(resp => {
          console.log(resp);
          let autoFillState = resp.user;
          this.setState({ ...autoFillState });
        });
    }
  }

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
    const { startTimeIndex, endTimeIndex } = this.handleTimes(event);
    const user = this.state.userName;
    //UPDATE OR POST TO USERINPUT TABLE
    if (this.state.previousUserChecked === true) {
      fetch(`https://agile-thicket-79673.herokuapp.com/userinput/${user}`, {
        method: "PUT",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          console.log(response);
        });
    } else {
      fetch("https://agile-thicket-79673.herokuapp.com/userinput", {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        }),
        body: JSON.stringify(formData)
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(response) {
          console.log(response);
        });
    }
    this.updateWeatherData({ formData, startTimeIndex, endTimeIndex });
  }

  handleTimes(event) {
    event.preventDefault();
    const startIndex = event.target["start-time"].selectedIndex;
    const getStartIndexForHour = timeIndices[startIndex];
    const endIndex = event.target["end-time"].selectedIndex;
    const getEndIndexForHour = timeIndices[endIndex];
    return {
      startTimeIndex: getStartIndexForHour,
      endTimeIndex: getEndIndexForHour
    };
  }

  updateWeatherData({ formData, startTimeIndex, endTimeIndex }) {
    //FETCH DELETE WEATHERS DATA HERE
    fetch("https://agile-thicket-79673.herokuapp.com/weathers", {
      method: "DELETE",
      headers: new Headers({
        "content-type": "application/json"
      })
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(resp) {
        console.log(resp);
      });

    const startHourlyUrl = `https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/f2ac151de86fd0ea/hourly/q/${
      formData.startState
    }/${formData.startCity}/${formData.startZip}.json`;
    fetch(startHourlyUrl)
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response);
        const firstWeather = response.hourly_forecast[startTimeIndex];

        const hourlyUrl = `https://cors-anywhere.herokuapp.com/http://api.wunderground.com/api/f2ac151de86fd0ea/hourly/q/${
          formData.endState
        }/${formData.endCity}/${formData.endZip}.json`;

        fetch(hourlyUrl)
          .then(response => {
            return response.json();
          })
          .then(response => {
            console.log(response);
            const secondWeather = response.hourly_forecast[endTimeIndex];

            //FETCH POST TO WEATHERS TABLE HERE
            fetch("https://agile-thicket-79673.herokuapp.com/weathers", {
              method: "POST",
              headers: new Headers({
                "content-type": "application/json"
              }),
              body: JSON.stringify({
                firstWeather: firstWeather,
                secondWeather: secondWeather
              })
            })
              .then(function(response) {
                return response.json();
              })
              .then(function(resp) {
                console.log(resp);
              });
          });
      });
    //FETCH GET FROM WEATHERS TABLE HERE
    fetch("https://agile-thicket-79673.herokuapp.com/weathers")
      .then(response => {
        return response.json();
      })
      .then(firstResponse => {
        console.log(firstResponse)
        const first = firstResponse[0].firstWeather;

        const sun1 = first.condition;
        const precipitation1 = first.qpf.english;
        const temp1 = first.temp.english;
        const windChill1 = first.feelslike.english;
        const propsWeather1 = { sun1, precipitation1, temp1, windChill1 };

        const second = firstResponse[0].secondWeather;

        const sun2 = second.condition;
        const precipitation2 = second.qpf.english;
        const temp2 = second.temp.english;
        const windChill2 = second.feelslike.english;
        const propsWeather2 = { sun2, precipitation2, temp2, windChill2 };
        this.setState({
          startWeather: propsWeather1,
          endWeather: propsWeather2
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const startWeather = this.state.startWeather;
    const endWeather = this.state.endWeather;
    return (
      <div>
        <div className="card mb-3">
          <h3 className="card-header">ROUTE & TIMES</h3>
          <ul className="list-group list-group-flush">
            <form className="form" onSubmit={event => this.handleSubmit(event)}>
              <div className="form-group">
                <label htmlFor="search">User Name (OPTIONAL)</label>
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
                <fieldset className="form-group">
                  <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={this.state.previousUserChecked}
                        onClick={this.handleClick}
                      />
                      If you're a previous user, check box to auto-fill your
                      last route.
                    </label>
                  </div>
                </fieldset>
                <div className="card-header" />
                <label htmlFor="search">Starting City</label>
                <input
                  type="text"
                  className="form-control"
                  id="start-city"
                  name="startCity"
                  value={this.state.startCity}
                  placeholder="Denver"
                  onChange={this.handleChange}
                />
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
                <input
                  type="text"
                  className="form-control"
                  id="start-zip"
                  name="startZip"
                  value={this.state.startZip}
                  placeholder="80210"
                  onChange={this.handleChange}
                />
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
