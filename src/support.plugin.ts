import { FastifyInstance } from 'fastify'

export const plugin = function (fastify: FastifyInstance, opts: unknown, next: Function): void {
  fastify.decorate('someSupport', () => 'hello')
  next()
}
