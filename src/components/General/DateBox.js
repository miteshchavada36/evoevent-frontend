import moment from "moment";
import React from "react";

const DateBox = ({ date=null,className="" }) => {
  // Check if the date is valid
  const isValidDate = moment(date).isValid();

  // Format date or fallback to "NA"
  const day = isValidDate ? moment(date).format("DD") : "NA";
  const monthYear = isValidDate
    ? moment(date).format("MMM'YY").toUpperCase()
    : "";

  return (
    <div className={`date-box border rounded text-center ${className}`}>
      <div>{day}</div>
      <div className="small d-block text-dark">{isValidDate ? monthYear : ""}</div>
      {!isValidDate && <div className="small d-block">NA</div>}
    </div>
  );
};

export default DateBox;
