import ProductRepository from '@/app/repositories/product.repository'
import { Request, Response } from 'express'
import { ProductEmitter } from '@/app/events/product.EventEmitter'
import { success, notFound } from '@/app/http/responses/api.response'
import { Controller } from '@/app/http/controllers/controller'
import { NotFoundError } from '@/app/errors/notFound.error'
import { HttpStatus } from '@/util/httStatus'
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

    return res.status(200).json('hello word')
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.product.findById(id)

      return res.json(success(data))
    } catch (e) {
      if (e instanceof NotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).json(notFound())
      }
      throw e
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.product.create(req.body)
      return res.json(success(data))
    } catch (e) {
      throw e
    }
  }
}
