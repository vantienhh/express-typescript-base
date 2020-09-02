import { AnySchema } from 'joi'
import { ValidationException } from '@/app/exceptions/validation.exception'

export const validate = (schema: AnySchema, data: any): void => {
  const result = schema.validate(data, {
    abortEarly: false // abort after the last validation error
  })

  if (result.error && result.error.details) {
    const errors: Record<string, any> = {}

    result.error.details.forEach(detail => {
      const key = detail.context?.label || detail.path[0]
      errors[key] = detail.message.replace(/"/g, '')
    })

    throw new ValidationException(errors)
  }
}
