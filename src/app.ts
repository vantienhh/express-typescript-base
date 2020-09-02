import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from '@/routes'
import { Logger } from '@/utils/logger'
import { mongooseConnect } from '@/utils/mongoose'
import { handleException } from '@/utils/handler.exception'
import { HttpStatus } from '@/utils/http-status'

export default class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.middleware()
    this.database()
    this.logger()

    this.express.use(routes)
    this.express.use(handleException)
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
        limit: '20kb'
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
}
