import { AnyClass } from '@/types'
import { AnySchema } from 'joi'
import { ValidationException } from '@/app/exceptions/validation.exception'

/**
 * bind all prototype (except constructor) of class
 * (when use ProductController.index => reference to function 'ProductController.index')
 *
 * @param {AnyClass} controller. Is class
 * @param {any} self. Is 'this' of 'class'
 */
export function bindAll(controller: AnyClass, self: any): void {
  Object.getOwnPropertyNames(controller.prototype)
    .filter(propertyName => propertyName !== 'constructor')
    .forEach(method => (self[method] = self[method].bind(self)))
}

/**
 * validate data by joi validate
 *
 * @param {Joi.AnySchema} schema
 * @param data
 *
 * @throws ValidationException
 */
export const validate = (schema: AnySchema, data: any): void => {
  const result = schema.validate(data, {
    abortEarly: false // abort after the last validation error
  })

  if (result.error && result.error.details) {
    const errors: Record<string, any> = {}

    result.error.details.forEach(detail => {
      const key = detail.context?.label || detail.path[0]
      errors[key.toString()] = detail.message.replace(/"/g, '')
    })

    throw new ValidationException(errors)
  }
}
