// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

const cors = require('@fastify/cors')
fastify.register(cors, {
    // put cors options here
    origin: (origin, cb) => {
        const hostname = new URL(origin).hostname
        if(hostname === "localhost"){
          //  Request from localhost will pass
          cb(null, true)
          return
        }
        // Generate an error on other origins, disabling access
        cb(new Error("Not allowed"), false)
      }
})

// Declare a route
// const data_model = require('./model.json')
fastify.get('/', async (request, reply) => {
    reply.send({
        hello: 'world'
    })
})

// Register routes
const postRoutes = require('./routes/posts')
postRoutes.forEach((route, index) => {
    fastify.route(route)
})

const carRoutes = require('./routes/cars')
carRoutes.forEach((route, index) => {
    fastify.route(route)
})

// Run the server
const start = async () => {
    try {
        await fastify.listen({
            port: 3000
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()