import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from '@/routes'
import { Logger } from '@/plugins/logger'
import { mongooseConnect } from '@/plugins/mongoose'

export default class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.security()
    this.middleware()

    this.database()
    this.routes()

    this.logger()
  }

  private security(): void {
    // Set security HTTP headers
    this.express.use(helmet())
  }

  private middleware(): void {
    this.express.use(cors())

    // Limit request from the same API
    const limiter = rateLimit({
      max: 50, // 50 request
      windowMs: 60 * 1000, // 1 minute
      message: 'Too Many Request from this IP, please try again in an hour'
    })
    // apply rate limit request to all requests
    this.express.use(limiter)

    // Body parser, reading data from body into req.body
    this.express.use(bodyParser.urlencoded({ extended: false }))
    this.express.use(bodyParser.json())

    this.express.use(
      express.json({
        limit: '20kb'
      })
    )
  }

  private database(): void {
    try {
      const db = mongoose.connection

      db.on('connecting', function () {
        console.log('connecting to MongoDB...')
      })
      db.on('error', function (error) {
        console.error('Error in MongoDb connection: ' + error)
        void mongoose.disconnect()
      })
      db.on('connected', function () {
        console.log('MongoDB connected!')
      })
      db.once('open', function () {
        console.log('MongoDB connection opened!')
      })
      db.on('reconnected', function () {
        console.log('MongoDB reconnected!')
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

  private routes(): void {
    this.express.use(routes)
  }

  private logger(): void {
    // log when PROMISE is rejected and no error handler is attached to the promise
    process.on('unhandledRejection', (reason, promise) => {
      promise.catch(e => Logger.error(e.stack))
    })
    // log when warning
    process.on('warning', warning => {
      Logger.warn(`${warning.name} -- ${warning.message} \n ${warning.stack}`)
    })
  }
}
