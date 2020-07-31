import {Router} from 'express'
import * as core from 'express-serve-static-core'
import {authenticate} from '@/app/http/middleware/authenticate'
import AccountController from '@/app/http/controllers/api/AccountController'
import UserController from '@/app/http/controllers/api/userController'
import ProductController from '@/app/http/controllers/api/ProductController'
import FirebaseController from '@/app/http/controllers/api/FirebaseController'
import {validateCreateProduct} from '@/app/http/validators/ProductValidation'

export default class RouterApi {
  public routes: core.Router

  constructor() {
    this.routes = Router()

    this.routesAccount()
    this.routesUser()
    this.routesProduct()
    this.routesFirebase()
  }

  private routesAccount(): void {
    let accountController = new AccountController()

    this.routes.post('/register', accountController.register)
    this.routes.post('/login', accountController.login)
  }

  private routesUser(): void {
    let userController = new UserController()

    this.routes.get('/users', userController.index)
    this.routes.post('/users/store', userController.store)
  }

  private routesProduct(): void {
    let productController = new ProductController()

    this.routes.post('/products/create', validateCreateProduct(), productController.create)
  }

  private routesFirebase(): void {
    let firebaseController = new FirebaseController()

    this.routes.get('/firebase', authenticate, firebaseController.index)
    this.routes.post('/firebase/create', authenticate, firebaseController.create)
    this.routes.put('/firebase/update', authenticate, firebaseController.update)
  }

}
