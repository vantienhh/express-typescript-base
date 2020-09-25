import { HttpException } from '@/app/exceptions/http.exception';
import { HttpStatus } from '@/utils/config';
import { IResponse } from '@/types';

export class ValidationException extends HttpException {
  public errors: Record<string, any>;

  constructor(errors: Record<string, any>, message?: string) {
    super();

    this.name = 'ValidationError';
    this.message = message || 'Unprocessable Entity';
    this.errors = errors;

    Object.setPrototypeOf(this, ValidationException.prototype);
  }

  get response(): IResponse {
    return {
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: this.message,
      data: {
        errors: this.errors
      }
    };
  }
}
