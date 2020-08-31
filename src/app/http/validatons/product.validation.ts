import { Request, Response, NextFunction } from 'express'
import Joi, { AnySchema } from 'joi'
import { validate } from '@/util/validate'

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  const schema: AnySchema = Joi.object({
    name: Joi.string().required().min(2),
    price: Joi.number().required()
  })

  try {
    validate(schema, req.body)

    next()
  } catch (e) {
    next(e)
  }
}
