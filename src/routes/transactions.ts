import crypto from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import z from 'zod'
import {knex} from '../database'

export const transactionRoutes = async (app: FastifyInstance) => {
  app.get('/', async (req,res)=> {
    const transactions = await knex('transactions')
      .select('*')
    return res.send(transactions)
  })

  app.post('/', async (req, res)=> {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      value: z.number(),
      type: z.enum(['credit', 'debit'])
    })


    const {title, value, type} = createTransactionBodySchema.parse(req.body)  

    knex('transactions').insert({
      id: crypto.randomUUID(),
      title,
      value: type === 'credit' ? value : value*-1
    })


    res.status(201).send({
      message: "Parabéns recusrtop criado com sucesso!",
    })

  })
 


}