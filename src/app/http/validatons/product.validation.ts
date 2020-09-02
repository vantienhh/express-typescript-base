import { Request, Response, NextFunction } from 'express'
import Joi, { AnySchema } from 'joi'
import { validate } from '@/utils/validate'

export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema: AnySchema = Joi.object({
      name: Joi.string().required().min(2),
      price: Joi.number().required().min(0)
    })
    validate(schema, req.body)

    next()
  } catch (e) {
    next(e)
  }
}
