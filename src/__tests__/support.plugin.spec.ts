import { FastifyInstance } from 'fastify'
import { createServer } from 'fastify-di'

let server: FastifyInstance

beforeAll(async () => {
  server = await createServer()
})

afterAll(() => {
  server.close()
})

describe('supportPlugin test', () => {
  test('/', async done => {
    await server.ready()
    expect(server.someSupport()).toBe('hello')
    done()
  })
})
