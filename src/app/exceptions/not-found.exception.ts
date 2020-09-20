import { HttpException } from '@/app/exceptions/http.exception'
import { HttpStatus } from '@/utils/config'
import { IResponse } from '@/types'

export class NotFoundException extends HttpException {
  constructor() {
    super()

    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundException.prototype)
  }

  get response(): IResponse {
    return {
      code: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      data: []
    }
  }
}
