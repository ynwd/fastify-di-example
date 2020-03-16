import { createConnection, loader, serviceContainer } from 'fastify-di'
import { HelloService } from '../hello.service'

let service: HelloService

beforeAll(async () => {
  await createConnection()
  await loader()
  service = serviceContainer.get('HelloService')
  await service.deleteAll()
})

afterAll(() => {
  service.close()
})

describe('test user service', () => {
  test('hi', async done => {
    const hi = service.hi()
    expect(hi).toBe('hi')
    done()
  })

  test('add user', async done => {
    const payload = {
      email: 'john@gmail.com',
      username: 'john',
      password: 'secret'
    }
    const user = await service.register(payload)
    expect(user.username).toBe('john')
    done()
  })

  test('get all', async done => {
    const users = await service.getAllUser()
    // console.log('users', users)
    expect(users.length).not.toBe(0)
    done()
  })
})
