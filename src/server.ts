import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/', async (request, reply) => {
  const query = await knex('sqlite_schema').select('*')
  return query
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('app is running on port 3333')
  })
