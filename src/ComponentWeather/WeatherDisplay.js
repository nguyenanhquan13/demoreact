
import '../WeatherDisplay.css';

const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return <div>No data</div>;
  }

  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

  const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString();

  return (
    <div className="weather-container">
      <h2>Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity} %</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Sunrise: {sunriseTime}</p>
      <p>Sunset: {sunsetTime}</p>
    </div>
  );
};

export default WeatherDisplay;
