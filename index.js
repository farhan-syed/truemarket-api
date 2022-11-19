// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Declare a route
const data_model = require('./model.json')
fastify.get('/', async (request, reply) => {
    return {
        data_model
    }
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