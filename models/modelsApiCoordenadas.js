const axios = require('axios');


async function ApiCoord (city) {
  try {
    
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city}`;

    const response = await axios.get(apiUrl,{

      headers: {
        'User-Agent': 'MiAplicacion/1.0'
      }
    });


    if (response.status === 200 && response.data && response.data.length > 0) {
   
      const firstResult = response.data[0];
      const lat = firstResult.lat;
      const lon = firstResult.lon;
    
      return { lat, lon };
    } 
    
    // else {
    //   throw new Error('No se encontraron coordenadas para el lugar especificado.');
    // }

  } catch (error) {
    
    throw new Error('Error al obtener las coordenadas: ' + error.message);
  }

};

module.exports = { ApiCoord };