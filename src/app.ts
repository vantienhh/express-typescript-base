import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from '@/routes'

export default class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.security()
    this.middleware()
    this.database()
    this.routes()
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
      const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'
      void mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
      })
    } catch (e) {
      throw e
    }
  }

  private routes(): void {
    this.express.use(routes)
  }
}
