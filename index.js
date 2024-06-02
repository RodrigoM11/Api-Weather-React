const express = require('express');
const cors = require('cors');
const { resolvers, typeDefs } = require ('./schema')
const { ApolloServer } = require ('apollo-server-express')
const app = express();
const jwt = require('express-jwt');
require('dotenv').config();

app.use(cors());

const secretKey = process.env.JWT_SECRET;

app.use(
        jwt({
            secret: secretKey,
            credentialsRequired: false
        })
)

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { status } = err;
  res.status(status).json(err);
};

const server = new ApolloServer({
  introspection: true, 
  playground: true, 
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { id, email } = req.user || {}
    return { id, email }
  }
})

app.use(errorHandler);

async function startServer() {
  await server.start(); 
  server.applyMiddleware({ app, path: '/graphql' });

}

  app.get('/', function (req, res) {
    res.send('Hola');
  });

app.listen(3000, () => {
  console.log('Servidor en funcionamiento en el puerto 3000');
});


startServer();

module.exports = app;