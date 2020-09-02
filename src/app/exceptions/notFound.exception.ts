import { HttpException } from '@/app/exceptions/http.exception'
import { HttpStatus } from '@/util/httStatus'
import { IResponse } from '@/types'

export class NotFoundException extends HttpException {
  constructor() {
    const response: IResponse = {
      code: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      data: []
    }

    super(response)
    this.name = 'NotFoundError'
    Object.setPrototypeOf(this, NotFoundException.prototype)
  }
}
