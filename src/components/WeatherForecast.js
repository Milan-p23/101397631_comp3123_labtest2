import React from "react";

const WeatherForecast = ({ forecastData }) => {
    if (!forecastData) return null;

    return (
        <div className="forecast-container">
            {forecastData.map((forecast) => (
                <div key={forecast.dt} className="forecast-card">
                    <p>{new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "short" })}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                        alt={forecast.weather[0].description}
                    />
                    <p>{Math.round(forecast.main.temp - 273.15)}°C</p>
                </div>
            ))}
        </div>
    );
};

export default WeatherForecast;
