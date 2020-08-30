import { Request } from 'express'
import { Logger } from '@/util/logger'

export abstract class Controller {
  protected loggerErrorRequest(req: Request, e: Error): void {
    const message = `${e.name} -- ${e.message} \n ${e.stack}`
    Logger.error(`[${req.method}] ${req.originalUrl} --- ${message}`)
  }
}
