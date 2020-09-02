import { Request, Response, NextFunction } from 'express'
import { success } from '@/app/http/responses/api.response'
import { bindAll } from '@/util/helper'
import { ProductService } from '@/app/services/product.service'
import { IProductService } from '@/types/Services'

export class ProductController {
  protected productService: IProductService

  constructor() {
    this.productService = new ProductService()
    bindAll(ProductController, this)
  }

  index(req: Request, res: Response) {
    return res.status(200).json('hello word')
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const data = await this.productService.show(id)

      return res.json(success(data))
    } catch (e) {
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.productService.create(req.body)
      return res.json(success(data))
    } catch (e) {
      next(e)
    }
  }
}
