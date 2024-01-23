import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'

export default function WeatherApp() {

  let api_key = '3eae8d220a4da163a3899b5aae288f6e';

  const [wicon, setWicon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
  
    try {
      let response = await fetch(url);
      let data = await response.json();
  
      if (data.cod && data.cod === "404") {
        // City or country not found
        alert("City or country not found");
        return;
      }

      if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
        setWicon(cloud_icon);
      }
      else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
        setWicon(drizzle_icon);
      }
      else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
        setWicon(rain_icon);
      }
      else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
        setWicon(snow_icon);
      }else{
        setWicon(cloud_icon)
      }
  
      let humidity = document.getElementsByClassName("humidity-percent");
      let wind = document.getElementsByClassName("wind-rate");
      let temperature = document.getElementsByClassName("weather-temp");
      let location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = data.main.humidity + " %";
      wind[0].innerHTML = data.wind.speed + " Km/h";
      temperature[0].innerHTML = data.main.temp + " C";
      location[0].innerHTML = data.name;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <>
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className='cityInput' placeholder='Search' name="" id="" />
        <div className='search_icon' onClick={()=>{search()}}>
          <img  src={search_icon} alt="" />
        </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className='element'>
            <img src={humidity_icon} alt="" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className='element'>
            <img src={wind_icon} className='icon' alt="" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      
    </div>
    </>
  )
}
