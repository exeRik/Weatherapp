import React from "react";

const Card = ({ hour }) => {
  if (!hour) return null;

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-md p-4 m-2 w-28 flex flex-col items-center text-center">
      <p className="text-xs font-medium text-gray-700">
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
