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

// const express = require('express');
// const cors = require('cors');
// const { resolvers, typeDefs } = require('./schema');
// const { ApolloServer } = require('apollo-server-express');
// const jwt = require('express-jwt');
// require('dotenv').config();

// const app = express();
// const secretKey = process.env.JWT_SECRET;

// app.use(cors());

// // Middleware de JWT
// app.use(
//   jwt({
//     secret: secretKey,
//     credentialsRequired: false,
//     algorithms: ['HS256'],
//   })
// );

// // Middleware de manejo de errores
// const errorHandler = (err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   const { status = 500 } = err;
//   res.status(status).json({ error: err.message });
// };

// app.use(errorHandler);

// // Configuración del servidor Apollo
// const server = new ApolloServer({
//   introspection: true,
//   playground: true,
//   typeDefs,
//   resolvers,
//   context: ({ req }) => {
//     const { id, email } = req.user || {};
//     return { id, email };
//   },
// });

// async function startServer() {
//   await server.start();
//   server.applyMiddleware({ app, path: '/graphql' });

//   app.get('/', function (req, res) {
//     res.send('Hola');
//   });

//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Servidor en funcionamiento en el puerto ${port}`);
//   });
// }

// startServer().catch((error) => {
//   console.error('Error starting server:', error);
//   process.exit(1);
// });

// module.exports = app;
