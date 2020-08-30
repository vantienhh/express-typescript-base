import { Request, Response, NextFunction } from 'express'
import Joi, { AnySchema } from 'joi'
import { validationError, error } from '@/app/http/responses/api.response'
import { HttpStatus } from '@/util/httStatus'
import { ValidationException } from '@/app/exceptions/validation.exception'
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
    if (e instanceof ValidationException) {
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(validationError(e.errors))
    } else {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error())
    }
  }
}
