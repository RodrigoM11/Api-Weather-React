const axios = require('axios');
require('dotenv').config();

async function ApiWeatherDetail (unit ,latitude ,longitude) {

  const apiKey = process.env.API_KEY_WEATHER;
    
    try {
      
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`;
  
      const response = await axios.get(apiUrl);
     
      if (response.status === 200 && response.data) {
        const weatherData = response.data;
        const windDirectionDegrees = weatherData.wind.deg;
        const index = Math.round(windDirectionDegrees / 45) % 8;
        const cardinalDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

        const weatherObjectDet = {
            setDay: new Date().toDateString(),
            humidity: weatherData.main.humidity,
            visibility: weatherData.visibility,
            airPressure: weatherData.main.pressure,
            windStatus: weatherData.wind.speed,
            windCardinalDirection: cardinalDirections[index]
        };
        
        return [weatherObjectDet];

      } else {
        throw new Error ('No se encontraron datos para las coordenadas especificadas.');
      }
    } catch (error) {
      
      throw new Error ('Error al obtener los datos del pronóstico: ' + error.message);
    }
  
  };
  
  module.exports = { ApiWeatherDetail };

 