import React from "react";

var moment = require("moment");

const StartTime = props => {
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

// const minute = timeNow.minutes()
// const hour = timeNow.hours() + 1
// const rounded = minute > 29 ? 00 : 30;
// timeNow.minutes(rounded);

//         for (let i = 0; i < numTimes; i++) {
//             return
//             let optionTime = React.createElement('option')

//             const timeStr = timeNow.add(30,'minute').format('k:mm');

//             optionTime.setAttribute('value', timeStr)
//             optionTime.textContent = timeStr;
//             // startDropdown.appendChild(optionTime)

//     }
// }
