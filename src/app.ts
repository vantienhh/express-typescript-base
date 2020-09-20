import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from '@/routes'
import { HttpStatus, Logger, mongooseConnect } from '@/utils'
import { HttpException } from '@/app/exceptions/http.exception'
import { IResponse } from '@/types'

export default class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.middleware()
    this.database()
    this.logger()

    this.express.use(routes)
    this.express.use(App.exceptionHandler)
  }

  private middleware(): void {
    // Set security HTTP headers
    this.express.use(helmet())

    // CORS
    this.express.use(
      cors({
        origin: 'https://example.com',
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        preflightContinue: false,
        optionsSuccessStatus: HttpStatus.OK
      })
    )

    // apply rate limit request to all requests
    this.express.use(
      rateLimit({
        max: 20, // 20 request
        windowMs: 60 * 1000, // 1 minute
        message: 'Too Many Request from this IP, please try again in an hour'
      })
    )

    this.express.use(
      express.json({
        limit: '50kb'
      })
    )

    // Body parser, reading data from body into req.body
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(bodyParser.json())
  }

  private database(): void {
    try {
      const db = mongoose.connection

      db.on('connecting', () => console.log('connecting to MongoDB...'))
      db.on('connected', () => console.log('MongoDB connected!'))
      db.once('open', () => console.log('MongoDB connection opened!'))
      db.on('reconnected', () => console.log('MongoDB reconnected!'))
      db.on('error', error => {
        console.error('Error in MongoDb connection: ' + error)
        void mongoose.disconnect()
      })
      db.on('disconnected', function () {
        console.log('MongoDB disconnected!')
        mongooseConnect()
      })
      mongooseConnect()
    } catch (e) {
      throw e
    }
  }

  private logger(): void {
    // log when PROMISE is rejected and no error handler is attached to the promise
    process.on('unhandledRejection', (reason, promise) => {
      promise.catch(err => Logger.error(`${err.name} -- ${err.message} \n ${err.stack}`))
    })
    // log when warning
    process.on('warning', warning => {
      Logger.warn(`${warning.name} -- ${warning.message} \n ${warning.stack}`)
    })
  }

  /**
   * The default error handler
   *
   * @param {Error} err
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @returns {e.Response<IResponse>}
   * @private
   */
  private static exceptionHandler(
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): express.Response<IResponse> {
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
}
