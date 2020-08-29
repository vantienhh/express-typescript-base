import { ResultResponse } from '@/types'
import {
  HTTP_SUCCESS,
  HTTP_NOT_FOUND,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_INTERNAL_SERVER_ERROR
} from '@/config/responseCode'

export const success = (data: any, code: number = HTTP_SUCCESS, message = 'Success'): ResultResponse => {
  return {
    code: code,
    message,
    data: data
  }
}

export const notFound = (code: number = HTTP_NOT_FOUND, message = 'Not Found'): ResultResponse => {
  return {
    code: code,
    message,
    data: 'Resource Not Found'
  }
}

export const deleteSuccess = (code: number = HTTP_SUCCESS, message = 'Deleted Success'): ResultResponse => {
  return {
    code: code,
    message,
    data: []
  }
}

export const validationError = (
  data: any,
  code: number = HTTP_UNPROCESSABLE_ENTITY,
  message = 'Unprocessable Entity'
): ResultResponse => {
  return {
    code: code,
    message,
    data
  }
}

export const error = (code: number = HTTP_INTERNAL_SERVER_ERROR, message = 'Server Error'): ResultResponse => {
  return {
    code: code,
    message
  }
}
