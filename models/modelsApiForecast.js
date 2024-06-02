const axios = require('axios');
require('dotenv').config();

const calcularMaximo = (nums) => Math.max(...nums);
const calcularMinimo = (nums) => Math.min(...nums);

const calcularPromedioConImagen = (forecast) => {
 
  const extremosPorDia = {};

  forecast.forEach((registro) => {
    const { dayCar, maxTemp, minTemp, image } = registro;

    const fecha = dayCar.split(' ')[0];
   
    if (!extremosPorDia[fecha]) {
      extremosPorDia[fecha] = {
        Maximos: [],
        Minimos: [],
        firstImage: image,
      };
    }

    extremosPorDia[fecha].Maximos.push(maxTemp);
    extremosPorDia[fecha].Minimos.push(minTemp);
  });

  const forecastDay = Object.keys(extremosPorDia).map((fecha) => {
    const maximo = parseFloat(calcularMaximo(extremosPorDia[fecha].Maximos).toFixed(1));
    const minimo = parseFloat(calcularMinimo(extremosPorDia[fecha].Minimos).toFixed(1));
    const firstImage = extremosPorDia[fecha].firstImage;

    return {
      dayCar: fecha,
      maxTempPromedio: maximo,
      minTempPromedio: minimo,
      firstImage: firstImage,
    };
  });
  
  return forecastDay;
};

async function ApiForecast (unit ,latitude ,longitude) {

    const apiKey = process.env.API_KEY_FORECAST;

    try {
      
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`;
  
      const response = await axios.get(apiUrl);
     
      if (response.status === 200 && response.data && response.data.list.length > 0) {
     
        const forecast = response.data.list.filter(item => (response.data.list[0].dt + 86400 < item.dt) && (item.dt < (response.data.list[0].dt + 432000)))
        
        
        .map(item => ({
            dayCar: new Date(item.dt * 1000).toLocaleDateString(),
            maxTemp: item.main.temp_max,
            minTemp: item.main.temp_min,
            image: item.weather[0].icon,
          }));
          
          return calcularPromedioConImagen(forecast);

      }
      
      else {
        throw new Error ('No se encontraron datos para las coordenadas especificadas.');
      }

    } catch (error) {
      
      throw new Error ('Error al obtener los datos del pronóstico: ' + error.message);
    }

  };
  
  module.exports = { ApiForecast };


// La Api proporciona maxTemp: -0.29 y minTemp: -0.29 identicos.
//   https://api.openweathermap.org/data/2.5/forecast?lat=40.7128&lon=-74.006&exclude=hourly,minutely,alerts&appid=3809e0d15359f6a20e8dcd0ebf67aaad&units=metric

     
     