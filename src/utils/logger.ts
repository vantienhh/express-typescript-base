import { Logger as WinstonLog, createLogger, format } from 'winston'
import { TransformableInfo } from 'logform'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = format

class WinstonLogger {
  private readonly logger: WinstonLog
  private static instance?: WinstonLogger

  constructor() {
    this.logger = createLogger({
      transports: WinstonLogger.getTransports(),
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6
      }
    })
  }

  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) WinstonLogger.instance = new WinstonLogger()
    return WinstonLogger.instance
  }

  private static getTransports() {
    const formatLog = printf((message: TransformableInfo) => {
      return `${message.timestamp}  [${message.level.toUpperCase()}] --- ${message.message}`
    })

    return [
      new DailyRotateFile({
        filename: 'src/storage/logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'silly', // logger all level
        format: combine(timestamp(), formatLog)
      })
    ]
  }

  error(message: string): void {
    console.log('\x1b[31m%s\x1b[0m', message)
    this.logger.error(message)
  }

  warn(message: string): void {
    console.log('\x1b[33m%s\x1b[0m', message)
    this.logger.warn(message)
  }
}

export const Logger = WinstonLogger.getInstance()
