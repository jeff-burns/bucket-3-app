import React, { Component } from 'react';

import StartTime from "../StartTime";
import EndTime from "../EndTime";
import StartWeather from "../StartWeather";
import EndWeather from "../EndWeather";

const inputData = { startCity: "", startState: "", startZip: "", endCity: "", endState: "", endZip: ""}
const inputNames = Object.getOwnPropertyNames(inputData);

class RouteTimesForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [...inputNames],
          startTime: 0,
          endTime: 0
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.handlePlaces(event)
        this.handleTimes(event)
    }

    handlePlaces = (event) => {
        event.preventDefault();

        let returnObj = {};

        inputNames.forEach(name => {
        returnObj[name] = event.target[name].value;
        });

        let newState = [...returnObj]

        this.setState({
            data: newState
            // startTime: startHour,
            // endTime: endHour
        })
        this.getRouteStartData.bind(this)
        this.getRouteEndData.bind(this)
    };

    handleTimes = (event) => {
        event.preventDefault();

        const startIndex = event.target.convertTime1.selectedIndex
        const getStartIndexForHour = (startIndex) => {
            if (startIndex < 5) {
                return  1
                } else if (startIndex < 7) {
                return  2
                } else if (startIndex < 9) {
                return 3
                } else if (startIndex < 11) {
                 return 4
                } else if (startIndex < 13) {
                return  5
                } else if (startIndex < 15) {
                return  6
                } else if (startIndex < 17) {
                return  7
                } else if (startIndex < 19) {
                return 8
                } else if (startIndex < 21) {
                return 9
                } else if (startIndex < 23) {
                return 10
                } else if (startIndex < 25) {
                return  11
                } else if (startIndex < 27) {
                return  12
                } else if (startIndex < 29) {
                return  13
                } else if (startIndex < 31) {
                return  14
                } else if (startIndex < 33) {
                return  15
                } else if (startIndex < 35) {
                return  16
                } else if (startIndex < 37) {
                return  17
                } else if (startIndex < 39) {
                return  18
                } else if (startIndex < 41) {
                return  19
                } else if (startIndex < 43) {
                return  20
                } else if (startIndex < 45) {
                return  21
                } else if (startIndex < 47) {
                return  22
                } else if (startIndex < 49) {
                return  23
                } else if (startIndex < 51) {
                return  24
                } else if (startIndex < 53) {
                return  25
                } else if (startIndex < 55) {
                return  26
                } else if (startIndex < 57) {
                return  27
                } else if (startIndex < 59) {
                return  28
                } else if (startIndex < 61) {
                return  29
                } else if (startIndex < 63) {
                return  30
                } else if (startIndex < 65) {
                return  31
                } else if (startIndex < 67) {
                return  32
                } else if (startIndex < 69) {
                return  33
                } else if (startIndex < 71) {
                return  34
                } else {
                return  35
                }
        }

        const endIndex = event.target.convertTime2.selectedIndex
        const getEndIndexForHour = (endIndex) => {
            if (endIndex < 5) {
                return  1
                } else if (endIndex < 7) {
                return  2
                } else if (endIndex < 9) {
                return 3
                } else if (endIndex < 11) {
                 return 4
                } else if (endIndex < 13) {
                return  5
                } else if (endIndex < 15) {
                return  6
                } else if (endIndex < 17) {
                return  7
                } else if (endIndex < 19) {
                return 8
                } else if (endIndex < 21) {
                return 9
                } else if (endIndex < 23) {
                return 10
                } else if (endIndex < 25) {
                return  11
                } else if (endIndex < 27) {
                return  12
                } else if (endIndex < 29) {
                return  13
                } else if (endIndex < 31) {
                return  14
                } else if (endIndex < 33) {
                return  15
                } else if (endIndex < 35) {
                return  16
                } else if (endIndex < 37) {
                return  17
                } else if (endIndex < 39) {
                return  18
                } else if (endIndex < 41) {
                return  19
                } else if (endIndex < 43) {
                return  20
                } else if (endIndex < 45) {
                return  21
                } else if (endIndex < 47) {
                return  22
                } else if (endIndex < 49) {
                return  23
                } else if (endIndex < 51) {
                return  24
                } else if (endIndex < 53) {
                return  25
                } else if (endIndex < 55) {
                return  26
                } else if (endIndex < 57) {
                return  27
                } else if (endIndex < 59) {
                return  28
                } else if (endIndex < 61) {
                return  29
                } else if (endIndex < 63) {
                return  30
                } else if (endIndex < 65) {
                return  31
                } else if (endIndex < 67) {
                return  32
                } else if (endIndex < 69) {
                return  33
                } else if (endIndex < 71) {
                return  34
                } else {
                return  35
                }
        }

        this.setState({
            
            startTime: getStartIndexForHour,
            endTime: getEndIndexForHour
        })
    }

    getRouteStartData = () => {

        const startHourlyUrl = `http://api.wunderground.com/api/2b572770b27d6c40/hourly/q/${this.state.startState}/${this.state.startCity}/${this.state.startZip}.json`
    
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
            this.state.weatherStart.map(weather => {
                return (
                  <StartWeather
                    sun={weather.hourly_forecast[this.state.startTime].condition}
                    precipitation={weather.hourly_forecast[this.state.startTime].qpf.english}
                    temp={weather.hourly_forecast[this.state.startTime].temp.english}
                    windChill={weather.hourly_forecast[this.state.startTime].feelslike.english}
                  />
                );
            });
          })
          .catch(error => {
            console.log(error);
          });
    }

    getRouteEndData = () => {

    const endUrl = `http://api.wunderground.com/api/2b572770b27d6c40/hourly/q/${this.state.endState}/${this.state.endCity}/${this.state.endZip}.json`

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
                    precipitation={weather.hourly_forecast[this.state.endTime].qpf.english}
                    temp={weather.hourly_forecast[this.state.endTime].temp.english}
                    windChill={weather.hourly_forecast[this.state.endTime].feelslike.english}
                  />
                );
              });
            
        })
        .catch(error => {
        console.log(error);
        });
    }

    render() {
        return (
            <div>
            <div className="card mb-3">
                <h3 className="card-header">ROUTE & TIMES</h3>
                <ul className="list-group list-group-flush">
                    <form className="form" onSubmit={this.onSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="search">Starting City</label>
                            <input type="text" className="form-control" id="start-city"  name="startCity" value={this.state.startCity} placeholder="Denver"></input>
                            <label htmlFor="search">Starting State</label>
                            <input type="text" className="form-control" id="start-state" name="startState" value={this.state.startState} placeholder="CO"></input>
                            <label htmlFor="search">Starting ZipCode</label>
                            <input type="text" className="form-control" id="start-zip" name="startZip" value={this.state.startZip} placeholder="80210"></input>
                            <div className="card-header"></div>
                             
                            <StartTime convertTime1={this.state.startTime}
                                       handleTimes={this.handleTimes.bind(this)}
                            />     
                            <div className="card-header"></div>
                                
                            <label htmlFor="search">Ending City</label>
                            <input type="text" className="form-control" id="end-city" name="endCity" value={this.state.endCity} placeholder="Denver"></input>
                            <label htmlFor="search">Ending State</label>
                            <input type="text" className="form-control" id="end-state" name="endState" value={this.state.endState} placeholder="CO"></input>
                            <label htmlFor="search">Ending ZipCode</label>
                            <input type="text" className="form-control" id="end-zip" name="endZip" value={this.state.endZip} placeholder="80202"></input>
                            <div className="card-header"></div>

                            <EndTime convertTime2={this.state.endTime}
                                     handleTimes={this.handleTimes.bind(this)}
                            />

                            <div className="card-header"></div>
                        </div>
                        <button id="submit-button" type="submit" className="btn btn-success btn-lg btn-block">
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
        )
    }
}

export default RouteTimesForm;

// this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleSubmit()