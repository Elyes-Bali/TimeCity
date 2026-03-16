import React from "react";
import DigitalClock from "./DigitalClock";
import AnalogClock from "./AnalogClock";

const ClockQuestion = ({ eq }) => {
  return (
    <div className="mb-10">

      {eq.mode === "clock" && eq.clockType === "digital" && (
        <DigitalClock
          hours={eq.clockTime.hours}
          minutes={eq.clockTime.minutes}
          seconds={eq.clockTime.seconds}
        />
      )}

      {eq.mode === "clock" && eq.clockType === "analog" && (
        <AnalogClock
          hours={eq.clockTime.hours}
          minutes={eq.clockTime.minutes}
          seconds={eq.clockTime.seconds}
        />
      )}

    </div>
  );
};

export default ClockQuestion;