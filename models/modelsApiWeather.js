const axios = require('axios');
require('dotenv').config();

async function ApiWeather (unit ,latitude ,longitude) {

    const apiKey = process.env.API_KEY_WEATHER;
    
    try {
      
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`;
  
      const response = await axios.get(apiUrl);
     
      if (response.status === 200 && response.data) {
        const weatherData = response.data;
  
        const weatherObject = {
          setDay: new Date().toDateString(), 
          city: weatherData.name,
          currentTemp: weatherData.main.temp,
          weatherStatus: weatherData.weather[0].main,
          weatherImage: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`,
        };
  
        return [weatherObject];

      } else {
        throw new Error ('No se encontraron datos para las coordenadas especificadas.');
      }
    } catch (error) {
      
      throw new Error ('Error al obtener los datos del pronóstico: ' + error.message);
    }
  
  };
  
  module.exports = { ApiWeather };

  