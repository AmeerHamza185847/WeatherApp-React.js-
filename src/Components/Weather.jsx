import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';


export const Weather = () => {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [errorData, setErrorData] = useState(null);
    let API_KEY = '41ef7e4ae8c1ce2b25f6ff0cdd918409';


    let getWeather = async (cityName) => {
        cityName = cityName.trim();
        if(cityName === ""){
            alert("Write City Name here..")
        }
        else{

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            setErrorData("");
            setWeatherData(response);
            console.log("response :", response);
            setCityName("");
        }
        catch (error) {
            setErrorData("City not found");
            setWeatherData(null);
            setCityName("");
        }
    }
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        getWeather(cityName);
    }

    return (
        <div className='mainWrapper'>
            <form onSubmit={handleSubmit} className='weatherForm'>
                <p className='inputPara'>
                    <input
                        type="text"
                        placeholder='Write city name here...'
                        onChange={(e) => { setCityName(e.target.value) }}
                        value={cityName}
                    />
                </p>

                <p className='btnPara'>
                    <button type='submit'>Get Weather</button>
                </p>

            </form>

            <br />
            <br />
            <br />
            <br />
            <br />

            {errorData && <p className='errorMsg'>{errorData}</p>}
            {
                weatherData && <div className='weatherDataWrapper'>
                    <h4>{weatherData.data.name}</h4>
                    <div>
                        <span>Clouds : {weatherData.data.weather[0].description}</span>
                        <span className='imgSpan'><img
                            className='weatherIcon'
                            src={`http://openweathermap.org/img/wn/${weatherData.data.weather[0].icon}@2x.png`} alt="WeatherIcon"
                        />
                        </span>
                    </div>
                    <h3>MaxTemp : {Math.floor((weatherData.data.main.temp_max) - 273.15)} °C</h3>
                    <h3>MinTemp : {Math.floor((weatherData.data.main.temp_min) - 273.15)} °C</h3>
                    <h5>Humidity : {weatherData.data.main.humidity} %</h5>
                </div>
            }
        </div>
    )
}