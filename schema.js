const { gql } = require ('apollo-server-express');
const { ApiCoord } = require ('./models/modelsApiCoordenadas');
const { ApiForecast } = require ('./models/modelsApiForecast');
const { ApiWeather } = require ('./models/modelsApiWeather');
const { ApiWeatherDetail} = require ('./models/modelsApiWeatherDetail');
const jsonwebtoken = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const { create, find } = require ('./models/modelsUser');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const typeDefs = gql`

type CoordOutput {
    lat: Float
    lon: Float
}
  
input Coord {
    unit: String
    lat: Float
    lon: Float
}

type Today {
    setDay: String
    city: String
    currentTemp: Float
    weatherStatus: String
    weatherImage: String
}

type TodayDetail {
    setDay: String
    humidity: Float
    visibility: Float
    airPressure: Float
    windStatus: Float
    windCardinalDirection: String
}

type FollDays {
    dayCar: String
    maxTempPromedio: Float
    minTempPromedio: Float
    firstImage: String 
}

input UserCredentials {
    email: String!
    password: String!
  }

type Query {
    
    coordenadas(city: String) : CoordOutput
    weather(cCity : Coord) : [Today]
    forecast(cCity : Coord) : [FollDays]
    weatherDetail (cCity : Coord) : [TodayDetail]
}

type Mutation {

    login  (input: UserCredentials!): String
    signup (input: UserCredentials!): String
  }
`

const resolvers = {

Query: {

    async coordenadas (_,{ city }) {
        return await ApiCoord(city)
    },
    async weather (_,{ cCity }){
        const { unit, lat, lon } = cCity;
        return await ApiWeather(unit, lat, lon)
    },
    async forecast (_,{ cCity }) {
        const { unit, lat, lon } = cCity;
        return await ApiForecast(unit, lat, lon);
    },
    async weatherDetail (_,{ cCity }) {
        const { unit, lat, lon } = cCity;
        return await ApiWeatherDetail(unit, lat, lon);
    }
},

Mutation: {

    async login (_, { input }) {
       
        await new Promise(resolve => setTimeout(resolve, 1000))
  
        const { email, password } = input
        const user = await find({ email })
  
        if (!user) {
          throw new Error('No user with that email')
        }
  
        const valid = await bcrypt.compare(password, user.password)
  
        if (!valid) {
          throw new Error('Incorrect password')
        }
  
        // return json web token
        return jsonwebtoken.sign(
          { id: user.id, email: user.email },
         secretKey,
          { expiresIn: '1d' }
        )
      },

      async signup (_, { input }) {
        // add 1 second of delay in order to see loading stuff
        await new Promise(resolve => setTimeout(resolve, 1000))
  
        const { email, password } = input
  
        const user = await find({ email })
  
        if (user) {
          throw new Error('User already exists')
        }
  
        const newUser = await create({
          email,
          password
        })
  
        // return json web token
        return jsonwebtoken.sign(
          { id: newUser.id, email: newUser.email },
         secretKey,
          { expiresIn: '1y' }
        )
      },

}

}

module.exports = { typeDefs, resolvers }


