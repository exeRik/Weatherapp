
export const fetchWeather = async (API_KEY, city) => {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return res.json();
};
