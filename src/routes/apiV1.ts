import { Router } from 'express'
import { Router as coreRouter } from 'express-serve-static-core'
import UserController from '@/app/http/controllers/api/user.controller'
import ProductController from '@/app/http/controllers/api/product.controller'
import { validateCreateProduct } from '@/app/http/validatons/product.validation'

export class ApiV1 {
  public routes: coreRouter

  constructor() {
    this.routes = Router()

    this.routesUser()
    this.routesProduct()
  }

  private routesUser(): void {
    const userController = new UserController()

    this.routes.get('/users', userController.index)
    this.routes.post('/users/store', userController.store)
  }

  private routesProduct(): void {
    const productController = new ProductController()

    this.routes.get('/products', productController.index)
    this.routes.post('/products/create', validateCreateProduct, productController.create)
  }
}
