import { Request, NextFunction, Response } from 'express'
import { ApiError } from '@/app/errors/api.error'
import { HttpStatus } from '@/util/httStatus'
import { Logger } from '@/util/logger'

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof ApiError) {
    return res.status(err.httpCode).json({
      code: err.httpCode,
      message: err.httpMessage,
      data: err.httpData
    })
  }

  const messageLog = `${err.name} -- ${err.message} \n ${err.stack}`
  Logger.error(`[${req.method}] ${req.originalUrl} --- ${messageLog}`)

  const mess = process.env.NODE_ENV === 'production' ? 'Internal server error' : err.stack
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: mess,
    data: []
  })
}
