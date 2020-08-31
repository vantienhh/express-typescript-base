import { ApiError } from '@/app/errors/apiError'
import { HttpStatus } from '@/util/httStatus'

export class ValidationError extends ApiError {
  constructor(errors: Record<string, any>, message?: string) {
    const mess = message || 'Unprocessable Entity'
    const data = { errors: errors }

    super(HttpStatus.UNPROCESSABLE_ENTITY, mess, data)
  }
}
