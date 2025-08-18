import React, { useState, useEffect, useRef } from "react"; 
import Card from "./Card";
import { Wind, Thermometer, Droplet, Clock } from "lucide-react";

const Weatherr = () => {
  const [city, setCity] = useState("Kathmandu");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const inputRef = useRef(null);

  const API_KEY = "13b3ba61b64c436285e73544251608";

  const searchWeather = () => {
    setError("");
    setLoading(true);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    )
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => setError("Error: " + err.message))
      .finally(() => setLoading(false));
  };


   // ✅ Run once when app starts
  useEffect(() => {
    searchWeather("Kathmandu"); // ✅ fetch KTM on start
    inputRef.current.focus();   // ✅ focus input box on load
  }, []);

  const getIcon = () => {
    return (
      <img
        src={`https:${data.current.condition.icon}`}
        alt="Weather icon"
        className="w-20 h-20"
      />
    );
  };

  const getNextThreeHours = () => {
    if (!data || !data.forecast) return [];
    const now = new Date().getHours();

    return data.forecast.forecastday[0].hour
      .filter((h) => new Date(h.time).getHours() > now)
      .slice(0, 3); 
  };

const chooseBgClass = () => {
  if (!data || !data.current || !data.current.condition) return "bg-gray-300";

  const condition = data.current.condition.text.toLowerCase();

  if (condition.includes("sun")) return "bg-gradient-to-t from-yellow-200 via-orange-300 to-yellow-200";
  if (condition.includes("partly") && condition.includes("cloud")) return "bg-gradient-to-t from-gray-100 via-yellow-200 to-gray-100";
  if (condition.includes("rain")) return "bg-gradient-to-t from-blue-100 via-blue-300 to-blue-100";
  if (condition.includes("cloud")) return "bg-gradient-to-t from-gray-200 via-gray-300 to-gray-100";

  return "bg-gradient-to-t from-gray-200 via-gray-300 to-gray-100"; 
};


  return (
    <div className={`flex items-center justify-center h-screen ${chooseBgClass()}`}>
      <div className="border border-2xl bg-white/40 backdrop-blur-md shadow-6xl rounded-2xl max-w-150 p-9 py-7 flex flex-col items-center">

        {/* Input Section */}

        <div className="text-xl text-black drop-shadow-md tracking-wide font-bold  font-serif uppercase">WEATHER GENERATOR:<br/><br/></div>

        <div className="flex">
          <input
            type="text"
            placeholder="City name here"
            className="text-2xl border rounded-l-full px-4 py-2 outline-none max-w-60"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            ref={inputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchWeather();
              }
            }}
          />
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-r-full shadow-md transition-all hover:bg-blue-600"
            onClick={searchWeather}
          >
            Search
          </button>
        </div>

        {/* Loading / Error */}
        {loading && <p className="mt-4 text-2xl">Loading...</p>}
        {error && <p className="mt-4 text-red-600 text-xl">{error}</p>}

        {/* Weather Display */}
        {data && !loading && !error && (
          <>
            {/* Weather Icon */}
            <div className="mt-6">{getIcon()}</div>

            {/* Current Temp */}
            <h1 className="mt-4 text-6xl font-bold text-gray-800">
              {data.current.temp_c}°C
            </h1>

            {/* City & Country */}
            <h2 className="mt-2 text-2xl font-semibold text-gray-700">
              {data.location.name}, {data.location.country}
            </h2>

            {/* Local Time, Wind, Humidity */}
            <div className="mt-6 text-gray-800 text-lg text-center space-y-4 w-full">
              <div className="flex justify-center items-center gap-2">
                <Clock className="text-yellow-600 w-5 h-5" />
                <span>
                  {new Date(data.location.localtime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

               {/* wind and temp and rain */}
              <div className="flex justify-between items-center px-6">
                <span className="flex items-center gap-2 text-lg text-gray-700">
                  <Wind className="text-blue-700 w-5 h-5" />{" "}
                  {data.current.wind_mph} mph
                </span>
                <span className="flex items-center gap-2 text-lg text-gray-700">
                  <Droplet className="text-blue-500 w-5 h-5" />{" "}
                  {data.current.humidity}%
                </span>
                <span className="flex items-center gap-2 text-lg text-gray-700">
                  <Thermometer className="text-red-800 w-5 h-5" />{" "}
                  {data.current.pressure_mb} mb
                </span>
              </div>
            </div>

            {/*  Cards hmm */}
            <div className="text-2xl mt-5 mb-0 text-bold ">Forecast for Next three hours:</div>
            <div className="flex mt-8">
              
              {getNextThreeHours().map((hour, index) => (
                <Card key={index} hour={hour} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weatherr;
