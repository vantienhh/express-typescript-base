import { Router } from 'express'
import { Router as coreRouter } from 'express-serve-static-core'
import { ProductController } from '@/app/http/controllers/api/product.controller'
import { validateCreateProduct } from '@/app/http/validatons/product.validation'

export class ApiV1 {
  public router: coreRouter

  constructor() {
    this.router = Router()

    this.routerProduct()
  }

  private routerProduct(): void {
    const productController = new ProductController()

    this.router.get('/products', productController.index)
    this.router.get('/products/:id', productController.show)
    this.router.post('/products', validateCreateProduct, productController.create)
  }
}
