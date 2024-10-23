import fastify from 'fastify'
import type { FastifyInstance, RouteShorthandMethod } from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app:FastifyInstance = fastify()

app.get('/', async (req, res) => {
  return res.send({ hello: 'world' })
})

app.register(transactionRoutes, {
  prefix: 'transactions'
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('app is running on port ', env.PORT)
  })
