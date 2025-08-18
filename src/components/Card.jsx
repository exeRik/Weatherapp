import React from "react";

const Card = ({ hour }) => {
  if (!hour) return null;

  return (

    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-md px-4 py-2 mx-2 my-0 w-29 flex flex-col items-center text-center">
      <p className="text-2xs font-medium text-gray-700">
        {new Date(hour.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <img
        src={`https:${hour.condition.icon}`}
        alt={hour.condition.text}
        className="w-10 h-10 my-2"
      />
      <p className="text-sm font-semibold text-gray-800">{hour.temp_c}°C</p>
      <p className="text-[11px] text-gray-600">{hour.condition.text}</p>
    </div>
  );
};

export default Card;
