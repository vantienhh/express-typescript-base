export abstract class ApiError extends Error {
  public httpCode: number
  public httpMessage: string
  public httpData: any

  protected constructor(httpCode: number, httpMessage: string, httpData: any = []) {
    super()
    this.httpCode = httpCode
    this.httpMessage = httpMessage
    this.httpData = httpData
  }
}

// @ts-ignore
ApiError.prototype = Error.prototype
