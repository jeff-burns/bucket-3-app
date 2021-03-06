import React from "react";

var moment = require("moment");

const StartTime = props => {
  //timeNow will change each time it's iterated into the next half hour. logging timeNow after this function gives you the time 36 hours from this moment()
  const timeNow = moment();
  const numTimes = 35 * 2; // 36 hours, every half hour
  let timesArray = [];
  for (let i = 0; i < numTimes; i++) {
    let timeStr = timeNow.add(30, "m").format("ddd h:mm a");
    timesArray.push(timeStr);
  }

  const options = (
    <select className="custom-select options" id="start-time">
      <option key={"pickStartTime"} value="">
        Pick Start Time (REQUIRED)
      </option>
      {timesArray.map(dayTime => (
        <option key={dayTime} name="startTime" value={dayTime}>
          {dayTime}
        </option>
      ))}
    </select>
  );
  return <div> {options} </div>;
};

export default StartTime;
