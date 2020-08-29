import { Router } from 'express'
import * as core from 'express-serve-static-core'
import AccountController from '@/app/http/controllers/api/AccountController'
import UserController from '@/app/http/controllers/api/userController'
import ProductController from '@/app/http/controllers/api/ProductController'
import { validateCreateProduct } from '@/app/http/validators/ProductValidation'

export default class RouterApi {
  public routes: core.Router

  constructor() {
    this.routes = Router()

    this.routesAccount()
    this.routesUser()
    this.routesProduct()
  }

  private routesAccount(): void {
    const accountController = new AccountController()

    this.routes.post('/register', accountController.register)
    this.routes.post('/login', accountController.login)
  }

  private routesUser(): void {
    const userController = new UserController()

    this.routes.get('/users', userController.index)
    this.routes.post('/users/store', userController.store)
  }

  private routesProduct(): void {
    const productController = new ProductController()

    this.routes.post('/products/create', validateCreateProduct(), productController.create)
  }
}
