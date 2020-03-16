import { FastifyInstance } from 'fastify'
import { createServer, serviceContainer } from 'fastify-di'
import { HelloService } from '../hello.service'

let server: FastifyInstance
let service: HelloService

beforeAll(async () => {
  server = await createServer()
  service = serviceContainer.get('HelloService')
})

beforeEach(async () => {
  await service.deleteAll()
})

afterAll(() => {
  server.close()
})

describe('test hello end point', () => {
  test('simple controller /', async done => {
    const result = await server.inject({
      url: '/',
      method: 'GET'
    })
    expect(result.payload).toBe('hello')
    done()
  })

  test('simple service /hi', async done => {
    const result = await server.inject({
      url: '/hi',
      method: 'GET'
    })
    expect(result.payload).toBe('hi')
    done()
  })

  test('register /user', async done => {
    const result = await server.inject({
      url: '/user',
      method: 'POST',
      payload: {
        email: 'john@email.com',
        username: 'john',
        password: 'secret'
      }
    })
    // console.log(result)
    expect(result.statusCode).toBe(200)
    done()
  })
})
