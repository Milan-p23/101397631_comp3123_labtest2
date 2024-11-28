import React from "react";

const WeatherDetails = ({ weatherData }) => {
    if (!weatherData) return null;

    const { name, sys, main, weather, wind } = weatherData;

    return (
        <div className="weather-card">
            <h2>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</h2>
            <p>{new Date().toLocaleDateString()}</p>
            <p>{`${name}, ${sys.country}`}</p>
            <h1>{Math.round(main.temp - 273.15)}°C</h1>
            <p>{weather[0].description}</p>
            <div>
                <p>Humidity: {main.humidity}%</p>
                <p>Wind: {wind.speed} m/s</p>
            </div>
            <img
                src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt={weather[0].description}
            />
        </div>
    );
};

export default WeatherDetails;
