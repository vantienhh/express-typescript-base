import { IResponse } from '@/types';
import { HttpStatus } from '@/utils/config';

export const success = (data: any): IResponse => {
  return {
    code: HttpStatus.OK,
    message: 'Success',
    data: data
  };
};

export const notFound = (): IResponse => {
  return {
    code: HttpStatus.NOT_FOUND,
    message: 'Not Found',
    data: 'Resource Not Found'
  };
};

export const deleteSuccess = (): IResponse => {
  return {
    code: HttpStatus.OK,
    message: 'Deleted Success',
    data: []
  };
};

export const validationError = (data: any): IResponse => {
  return {
    code: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Unprocessable Entity',
    data: {
      errors: data
    }
  };
};

export const error = (message = 'Internal Server Error'): IResponse => {
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message
  };
};
