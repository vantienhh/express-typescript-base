import { IResponse } from '@/types'

export abstract class HttpException extends Error {
  protected constructor() {
    super()

    this.name = 'HttpException'
    Object.setPrototypeOf(this, HttpException.prototype)
  }

  abstract get response(): IResponse
}
