import { Entity, Column, Index } from 'typeorm'
import { BasicEntity } from 'fastify-di'

@Entity()
@Index(['id', 'email', 'username'])
export class User extends BasicEntity {
  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  username?: string

  @Column()
  password?: string
}
