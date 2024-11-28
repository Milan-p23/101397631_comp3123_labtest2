import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";
import "./Weather.css";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [city, setCity] = useState("Toronto");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        if (!city.trim()) {
            setError("City name cannot be empty.");
            setWeatherData(null);
            setForecastData(null);
            return;
        }

        setLoading(true);
        setError("");
        const API_KEY = "ee096c7f4e18a7871db065b32a2bcdd7"; // Replace with your API key
        const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

        try {
            const [currentResponse, forecastResponse] = await Promise.all([
                axios.get(currentWeatherURL),
                axios.get(forecastURL),
            ]);

            setWeatherData(currentResponse.data);

            const dailyForecast = forecastResponse.data.list.filter((forecast) =>
                forecast.dt_txt.includes("12:00:00")
            );

            setForecastData(dailyForecast);
        } catch (err) {
            setError("Failed to fetch weather data. Please check your API key or city.");
            setWeatherData(null);
            setForecastData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="weather-app">
            <h1 className="app-title">Weather App</h1>

            {/* Search Section */}
            <div className="city-selection">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="city-input"
                />
                <button onClick={fetchWeather} className="fetch-button">
                    Search
                </button>
            </div>

            {/* Current Weather Section */}
            <div className="current-weather-section">
                <WeatherDetails weatherData={weatherData} />
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">{error}</p>}
            </div>

            {/* 5-Day Forecast Section */}
            <div className="forecast-section">
                <h2 className="forecast-title">5-Day Forecast</h2>
                <WeatherForecast forecastData={forecastData} />
            </div>
        </div>
    );
};

export default Weather;
