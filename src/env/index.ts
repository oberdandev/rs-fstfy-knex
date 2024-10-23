import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.string(),
  PORT: z
    .string()
    .transform(val => Number.parseInt(val, 10))
    .refine(val => !Number.isNaN(val), { message: 'PORT must be a number' })
    .default('3333'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(_env.error.errors)
  throw new Error('env validation error')
}

export const env = _env.data
