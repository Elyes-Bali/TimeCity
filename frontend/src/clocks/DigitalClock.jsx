import React from "react";

const pad = (n) => String(n).padStart(2, "0");

const DigitalClock = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex justify-center mb-10">
      <div className="bg-black text-green-400 font-mono text-6xl px-10 py-6 rounded-3xl shadow-2xl tracking-widest">
        {pad(hours)}:{pad(minutes)}:{pad(seconds)}
      </div>
    </div>
  );
};

export default DigitalClock;