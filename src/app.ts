import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import routes from '@/routes'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'
// Add the Firebase services that you want to use
import 'firebase/database'
// import 'firebase/auth'
// import 'firebase/firestore'

export default class App {
  public express: express.Application

  constructor() {
    this.express = express()

    this.security()
    this.middleware()
    this.firebase()
    this.database()
    this.routes()
  }

  private security(): void {
    // Set security HTTP headers
    this.express.use(helmet())
  }

  private middleware(): void {
    // Limit request from the same API
    const limiter = rateLimit({
      max: 50,    // 50 request
      windowMs: 60 * 1000, // 1 minute
      message: 'Too Many Request from this IP, please try again in an hour',
    })

    this.express.use(bodyParser.urlencoded({extended: false}))
    this.express.use(bodyParser.json())
    this.express.use(cors())
    // apply rate limit request to all requests
    this.express.use(limiter)
    // Body parser, reading data from body into req.body
    this.express.use(express.json({
      limit: '20kb',
    }))
  }

  private database(): void {
    try {
      let dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test_nodejs'
      mongoose.connect(dbURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
    } catch (e) {
      throw e
    }
  }

  private firebase(): void {
    let firebaseConfig = {
      apiKey: process.env.FIREBASE_APIKEY || 'api-key',
      authDomain: process.env.FIREBASE_AUTHDOMAIN || 'project-id .firebaseapp.co',
      databaseURL: process.env.FIREBASE_DATABASEURL || 'https:// project-id .firebaseio.co',
      projectId: process.env.FIREBASE_PROJECTID || 'project-id',
      storageBucket: process.env.FIREBASE_STORAGEBUCKET || 'project-id .appspot.co',
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID || 'sender-id',
      appId: process.env.FIREBASE_APPID || 'app-id',
      // measurementId: process.env.FIREBASE_MEASUREMENTID || 'G-measurement-id',
    }

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  private routes(): void {
    this.express.use(routes)
  }

}

// export default new App().express
