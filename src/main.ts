import { createServer, start } from 'fastify-di'

createServer().then(server => {
  start(server)
})
