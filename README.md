# Api-Clima-React

This is a Node.js-based API that provides current weather information and extended forecasts. It uses:

- **Express** as the server framework
- **Apollo Server** for GraphQL
- **Coordinates API**: `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
- **Current Weather API**: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`
- **Extended Forecast API**: `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=${unit}`
- **Vercel** for deployment.

## Features

- Authentication with **JWT**.
- Password hashing with **bcrypt**.
- Database connection with **lowdb**.
- Queries and mutations with **GraphQL**.

## Requirements

Make sure you have the following components installed before running the API:

- [Node.js](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)

To clone the repository to your local machine:

```bash
git clone https://github.com/RodrigoM11/Api-Weather-React.git
