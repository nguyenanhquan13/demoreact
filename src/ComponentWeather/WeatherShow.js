import SearchBar from "./SearchBar";
import WeatherDisplay from "./WeatherDisplay";
import { useState, useEffect } from "react";
import '../WeatherDisplay.css';

function WeatherShow() {

    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');

    useEffect(() => {
        if (city === '') return;

        const fetchWeather = async () => {
            const apiKey = '9495a6a6259edc4480b05c179e8bfc03'; // Thay YOUR_API_KEY bằng API key từ OpenWeatherMap
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            setWeather(data);
          };
        
          fetchWeather();

    }, [city])

    const handleSearch = (newCity) => {
        setCity(newCity);
    };

    return (
        <div className="weather-show">
            <SearchBar onSearch={handleSearch}/>
            <WeatherDisplay weather={weather}/>
        </div>
    )
}

export default WeatherShow