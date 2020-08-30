import { ResultResponse } from '@/types'
import { HttpStatus } from '@/util/httStatus'

export const success = (data: any): ResultResponse => {
  return {
    code: HttpStatus.OK,
    message: 'Success',
    data: data
  }
}

export const notFound = (): ResultResponse => {
  return {
    code: HttpStatus.NOT_FOUND,
    message: 'Not Found',
    data: 'Resource Not Found'
  }
}

export const deleteSuccess = (): ResultResponse => {
  return {
    code: HttpStatus.OK,
    message: 'Deleted Success',
    data: []
  }
}

export const validationError = (data: any): ResultResponse => {
  return {
    code: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Unprocessable Entity',
    data: {
      errors: data
    }
  }
}

export const error = (message = 'Internal Server Error'): ResultResponse => {
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message
  }
}
