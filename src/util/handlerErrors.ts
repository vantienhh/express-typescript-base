import { Request, NextFunction, Response } from 'express'
import { ApiError } from '@/app/errors/apiError'
import { HttpStatus } from '@/util/httStatus'

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof ApiError) {
    return res.status(err.httpCode).json({
      code: err.httpCode,
      message: err.httpMessage,
      data: err.httpData
    })
  }

  const message = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.stack
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message,
    data: []
  })
}
