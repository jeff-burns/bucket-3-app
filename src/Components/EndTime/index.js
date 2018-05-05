import React from "react";

var moment = require("moment");

const EndTime = props => {
  const timeNow2 = moment();
  const numTimes2 = 35 * 2; // 36 hours, every half hour
  let timesArray2 = [];
  for (let i = 0; i < numTimes2; i++) {
    let timeStr2 = timeNow2.add(30, "m").format("ddd h:mm a");
    timesArray2.push(timeStr2);
  }

  const options2 = (
    <select className="custom-select options" id="end-time">
      <option key={"pickEndTime"} value="">
        Pick End Time (REQUIRED)
      </option>
      {timesArray2.map((dayTime, indices) => (
        <option key={dayTime} name="endTime" value={dayTime}>
          {dayTime}
        </option>
      ))}
    </select>
  );
  return <div>{options2}</div>;
};

export default EndTime;

// const minute = timeNow.minutes()
// const hour = timeNow.hours() + 1
// const rounded = minute > 29 ? 00 : 30;
// timeNow.minutes(rounded);

//     const options2 = () => {
//         for (let i = 0; i < numTimes2; i++) {
//             let optionTime2 = React.createElement('option')
//                 const timeStr2 = timeNow2.add(30,'minute').format('k:mm');
//                 optionTime2.setAttribute('value', timeStr2)
//                 optionTime2.textContent = timeStr2;
//                 // startDropdown.appendChild(optionTime)
//     }
// }
