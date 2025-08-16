import { useState } from "react";
import { Wind, Thermometer } from "lucide-react";

const API_KEY = "13b3ba61b64c436285e73544251608";

const Weatherr = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = () => {
    // if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    )
      .then((response) => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e) => setCity(e.target.value);
  const keypress = (e) => {
    if (e.key === "Enter") searchWeather();
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    return (
      <img
        src={`https:${weather.current.condition.icon}`}
        alt={weather.current.condition.text}
        className="w-24 h-24"
      />
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
      <div className='bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-sm p-8 flex flex-col items-center'>

        
        {/* Input Section */}
    <div className='flex w-full mb-4'>
  <input
    type='text'
    placeholder='Enter City Name'
    className='flex-1 text-lg p-3 rounded-l-full border border-gray-300 shadow-sm'
    value={city}
    onChange={handleInputChange}
    onKeyDown={keypress}
  />
  <button
    onClick={searchWeather}
    className={`bg-blue-500 text-white px-6 py-3 rounded-r-full shadow-md transition-all 
      ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-lg'}`}
  >
    Search
    {/* {loading ? "Searching..." : "Search"} */}
  </button>
</div>

        {/* Weather Info Section */}
        <div className="mt-8 flex flex-col items-center text-center">
          {loading && <p className="text-lg text-gray-600 ">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {weather && !loading && !error && (
            <>
              <div className="flex justify-center items-center">{getWeatherIcon()}</div>
              <h1 className="mt-4 text-6xl font-bold text-gray-800">
                {weather.current.temp_c}°C
              </h1>
              <h2 className="mt-2 text-2xl font-semibold text-gray-700">
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className="mt-1 text-xl text-gray-600">
                {weather.current.condition.text}
              </p>

              {/* Wind + Pressure Section */}
              <div className="mt-6 flex justify-between items-center w-full px-6">
                <span className="flex items-center gap-2 text-lg text-gray-700">
                  <Wind className="text-blue-700 w-5 h-5" /> {weather.current.wind_mph} mph
                </span>
                <span className="flex items-center gap-2 text-lg text-gray-700">
                  <Thermometer className="text-red-800 w-5 h-5" /> {weather.current.pressure_mb} mb
                </span>
              </div>

              {/* ✅ Hourly Forecast (Scroll Fix) */}
              <div className="mt-8 w-full">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  Next Hours Forecast
                </h3>
                <div className="flex overflow-x-auto space-x-4 pb-2">
                  {weather.forecast.forecastday[0].hour
                    .filter((h) => {
                      const now = new Date().getHours();
                      const hourTime = new Date(h.time).getHours();
                      return hourTime >= now && hourTime <= now + 4;
                    })
                    .slice(0, 4)
                    .map((h, idx) => (
                      <div
                        key={idx}
                        className="bg-gray-100 rounded-xl p-3 shadow-md flex flex-col items-center min-w-[70px]"
                      >
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(h.time).getHours()}:00
                        </p>
                        <img
                          src={`https:${h.condition.icon}`}
                          alt={h.condition.text}
                          className="w-8 h-8"
                        />
                        <p className="text-md font-bold text-gray-800">{h.temp_c}°C</p>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weatherr;
