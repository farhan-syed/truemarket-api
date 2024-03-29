// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: false,
})

const cors = require('@fastify/cors')
fastify.register(cors, {
  // put cors options here
  // origin: ['http://localhost:3002']
})

fastify.register(require('@fastify/multipart'))

require('dotenv').config()
// Register routes
const postRoutes = require('./routes/posts')
postRoutes.forEach((route, index) => {
  fastify.route(route)
})

const searchRoutes = require('./routes/search')
searchRoutes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server
const port = process.env.PORT || 3000
const start = async () => {
  try {
    await fastify.listen({
      port: port,
      host: '0.0.0.0',
    })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
