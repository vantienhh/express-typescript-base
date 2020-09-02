import { Request, NextFunction, Response } from 'express'
import { HttpStatus } from '@/utils/http-status'
import { Logger } from '@/utils/logger'
import { HttpException } from '@/app/exceptions/http.exception'

export const handleException = (err: Error, req: Request, res: Response, next: NextFunction): any => {
  if (err instanceof HttpException) {
    return res.status(err.response.code).json(err.response)
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
