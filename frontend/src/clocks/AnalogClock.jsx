import React from "react";

const AnalogClock = ({ hours, minutes, seconds }) => {

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mb-10">
      <div className="relative w-56 h-56 rounded-full border-8 border-zinc-800 bg-white shadow-2xl">

        {/* Clock Numbers */}
        {numbers.map((num) => {
          const angle = (num * 30 - 90) * (Math.PI / 180);
          const radius = 90;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={num}
              className="absolute text-xl font-bold text-zinc-800"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {num}
            </div>
          );
        })}

        {/* center */}
        <div className="absolute w-4 h-4 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20" />

        {/* hour hand */}
        <div
          className="absolute w-2 h-16 bg-black origin-bottom left-1/2 bottom-1/2 -translate-x-1/2 z-10"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />

        {/* minute hand */}
        <div
          className="absolute w-1.5 h-20 bg-black origin-bottom left-1/2 bottom-1/2 -translate-x-1/2 z-10"
          style={{ transform: `rotate(${minuteDeg}deg)` }}
        />

        {/* second hand */}
        <div
          className="absolute w-1 h-24 bg-red-500 origin-bottom left-1/2 bottom-1/2 -translate-x-1/2 z-10"
          style={{ transform: `rotate(${secondDeg}deg)` }}
        />

      </div>
    </div>
  );
};

export default AnalogClock;