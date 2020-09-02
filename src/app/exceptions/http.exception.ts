import { IResponse } from '@/types'

export abstract class HttpException extends Error {
  public response: IResponse

  protected constructor(response: IResponse) {
    super()
    this.response = response
    this.name = 'HttpException'
    Object.setPrototypeOf(this, HttpException.prototype)
  }
}
