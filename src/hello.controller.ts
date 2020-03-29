import { Controller, Get, Post, InjectService, Hook } from 'fastify-di'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Http2ServerResponse } from 'http2'
import { HelloService } from './hello.service'
import { User } from './user.entity'
import { getAllUserSchema } from './hello.schema'

// You can pass fastify plugin option at @Controller()
// for example: @Controller({ prefix: 'hello' })
// see this for other plugin options: https://www.fastify.io/docs/latest/Plugins/#plugin-options
@Controller()
export class WebController {
  // You can inject a service to controller
  // by call @InjectService decorator
  // pass a service class on it to get all properties to its instance
  @InjectService(HelloService)
  service: HelloService

  @Hook('onRequest')
  async req (request: FastifyRequest, reply: FastifyReply<Http2ServerResponse>): Promise<void> {
    // This hook will always be executed after the shared `onRequest` hooks
    // console.log('request', request.headers)
  }

  // You can pass fastify route option at @Get() or @Post().
  // for example: @Get({ url: '/' })
  // if option is empty,  default url value is '/'.
  // see this for other fastify route options: https://www.fastify.io/docs/latest/Routes/#options
  @Get()
  sayHello (equest: unknown, reply: FastifyReply<Http2ServerResponse>): void {
    reply.send('hello')
  }

  @Get({ url: '/hi' })
  sayHi (request: unknown, reply: FastifyReply<Http2ServerResponse>): void {
    const word = this.service.hi()
    reply.send(word)
  }

  @Get({ url: '/user', schema: getAllUserSchema })
  async getUser (): Promise<User[]> {
    const user = await this.service.getAllUser()
    return user
  }

  @Post({ url: '/user' })
  async register (request: FastifyRequest, reply: FastifyReply<Http2ServerResponse>): Promise<void> {
    const payload = request.body
    const user = await this.service.register(payload)
    reply.sendOk(user)
  }
}
