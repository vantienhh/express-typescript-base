import { ApiError } from '@/app/errors/api.error'
import { HttpStatus } from '@/util/httStatus'

export class NotFoundError extends ApiError {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'Not Found', [])
  }
}

NotFoundError.prototype = ApiError.prototype
