import { ApiError } from '@/app/errors/apiError'
import { HttpStatus } from '@/util/httStatus'

export class NotFoundError extends ApiError {
  constructor() {
    super(HttpStatus.NOT_FOUND, 'Not Found', [])
  }
}
