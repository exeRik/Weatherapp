import { useState } from 'react';
import { Wind, Thermometer, Clock } from "lucide-react";

// ✅ API key constant
const API_KEY = "13b3ba61b64c436285e73544251608";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    // ✅ Forecast API (includes current + hourly)
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`)
      .then(response => {
        if (!response.ok) throw new Error("City not found");
        return response.json();
      })
      .then(data => setWeather(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleInputChange = (e) => setCity(e.target.value);
  const keypress = (e) => { if (e.key === 'Enter') searchWeather() };

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
    <div className='flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 overflow-y-auto'>
      <div className='bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-96 p-8 flex flex-col items-center transition-transform transform hover:scale-105'>
        
        {/* Input Section */}
        <div className='flex flex-col items-center w-full'>
          <input
            type='text'
            placeholder='Enter City Name'
            className='text-lg p-3 rounded-full border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 shadow-sm'
            value={city}
            onChange={handleInputChange}
            onKeyDown={keypress}
          />
          <button
            onClick={searchWeather}
            className='bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 hover:shadow-lg transition-all'
          >
            Search
          </button>
        </div>

        {/* Weather Info Section */}
        <div className='mt-8 flex flex-col items-center text-center'>
          {loading && <p className='text-lg text-gray-600 animate-pulse'>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}

          {weather && !loading && !error && (
            <>
              {/* Current Weather */}
              <div className='flex justify-center items-center'>{getWeatherIcon()}</div>
              <h1 className='mt-4 text-6xl font-bold text-gray-800'>{weather.current.temp_c}°C</h1>
              <h2 className='mt-2 text-2xl font-semibold text-gray-700'>
                {weather.location.name}, {weather.location.country}
              </h2>
              <p className='mt-1 text-xl text-gray-600'>{weather.current.condition.text}</p>
              
              {/* Wind + Pressure */}
              <div className='mt-6 flex justify-around items-center w-full px-6'>
                <span className='flex items-center gap-2 text-lg text-gray-700'>
                  <Wind className='text-blue-700 w-5 h-5' /> {weather.current.wind_mph} mph
                </span>
                <span className='flex items-center gap-2 text-lg text-gray-700'>
                  <Thermometer className='text-red-800 w-5 h-5' /> {weather.current.pressure_mb} mb
                </span>
              </div>

              {/* Hourly Forecast */}
              <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600"/> Hourly Forecast
              </h3>
              <div className="flex overflow-x-auto gap-4 w-full pb-2">
                {weather.forecast.forecastday[0].hour.map((hour, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center bg-white rounded-xl shadow-md p-3 min-w-[80px]"
                  >
                    <p className="text-sm text-gray-600">{hour.time.split(" ")[1]}</p>
                    <img src={`https:${hour.condition.icon}`} alt={hour.condition.text} className="w-10 h-10" />
                    <p className="text-lg font-semibold text-gray-800">{hour.temp_c}°C</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
