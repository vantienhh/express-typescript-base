import { Logger as WinstonLog, createLogger, format } from 'winston'
import { TransformableInfo } from 'logform'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = format

class WinstonLogger {
  private readonly logger: WinstonLog
  private static instance?: WinstonLogger

  constructor() {
    this.logger = createLogger({
      transports: WinstonLogger.getTransports()
    })
  }

  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) WinstonLogger.instance = new WinstonLogger()
    return WinstonLogger.instance
  }

  private static getTransports() {
    const formatLog = printf((message: TransformableInfo) => {
      return `${message.timestamp} ${message.message}`
    })

    return [
      new DailyRotateFile({
        filename: 'src/storage/logs/error.%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        format: combine(timestamp(), formatLog)
      }),
      new DailyRotateFile({
        filename: 'src/storage/logs/warn.%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'warn',
        format: combine(timestamp(), formatLog)
      })
    ]
  }

  error(message: string): void {
    console.log('\x1b[31m%s\x1b[0m', message)
    this.logger.log('error', message)
  }

  warn(message: string): void {
    console.log('\x1b[33m%s\x1b[0m', message)
    this.logger.log('warn', message)
  }
}

export const Logger = WinstonLogger.getInstance()
