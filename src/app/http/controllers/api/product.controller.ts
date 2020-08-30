import ProductRepository from '@/app/repositories/product.repository'
import { Request, Response } from 'express'
import { ProductEmitter } from '@/app/events/product.EventEmitter'
import { HttpStatus } from '@/util/httStatus'
import { success, error } from '@/app/http/responses/api.response'
import { Controller } from '@/app/http/controllers/controller'
import { bindAll } from '@/util/helper'

export class ProductController extends Controller {
  protected product: typeof ProductRepository

  constructor() {
    super()
    this.product = ProductRepository
    bindAll(ProductController, this)
  }

  index(req: Request, res: Response) {
    ProductEmitter.once('test event', ProductEmitter.listenerTest)

    return res.status(200).json('1234')
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.product.create([{ name: 'ertyu' }, { name: 'oksokaoaks' }])
      return res.status(HttpStatus.OK).json(success(data))
    } catch (e) {
      this.loggerErrorRequest(req, e)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error())
    }
  }
}
