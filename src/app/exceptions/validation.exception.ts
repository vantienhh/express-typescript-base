export class ValidationException extends Error {
  public errors: Record<string, any>

  constructor(errors: Record<string, any>, message?: string) {
    super()
    this.errors = errors
    this.message = message || 'Unprocessable Entity'
  }
}

// @ts-ignore
ValidationException.prototype = Error.prototype
