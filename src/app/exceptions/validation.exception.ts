import { HttpException } from '@/app/exceptions/http.exception'
import { HttpStatus } from '@/util/httStatus'
import { IResponse } from '@/types'

export class ValidationException extends HttpException {
  constructor(errors: Record<string, any>, message?: string) {
    const response: IResponse = {
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: message || 'Unprocessable Entity',
      data: {
        errors: errors
      }
    }

    super(response)
    this.name = 'ValidationError'
    Object.setPrototypeOf(this, ValidationException.prototype)
  }
}
