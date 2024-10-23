import crypto from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { knex } from '../database'

export const transactionRoutes = async (app: FastifyInstance) => {
  app.get('/', async (req, res) => {
    const transactions = await knex('transactions').select()
    const count = await knex('transactions').count('*', { as: 'count' }).first()
    return res.send(
      {
        count: count?.['count'],
        transactions,
      })
  })

  app.get('/:id', async (req, res) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = getTransactionParamsSchema.parse(req.params);
    
    if(!id) {
      return res.status(400).send({
        message: 'ID inválido',
      })
    }

    const transaction = await knex('transactions').where({ id }).first()

    if (!transaction) {
      return res.status(404).send({
        message: 'Transação não encontrada',
      })
    }

    return res.send({
      transaction
    })
  })
  
  app.get('/summary', async (req, res) => {

  })


  app.post('/', async (req, res) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      value: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, value, type } = createTransactionBodySchema.parse(req.body)

    knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      value: type === 'credit' ? value : value * -1,
    })

    res.status(201).send({
      message: 'Parabéns recusrtop criado com sucesso!',
    })
  })
}
