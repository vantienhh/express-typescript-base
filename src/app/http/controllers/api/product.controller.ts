import ProductRepository from '@/app/repositories/product.repository'
import { Request, Response, NextFunction } from 'express'
import { ProductEmitter } from '@/app/events/product.EventEmitter'
import { success, notFound } from '@/app/http/responses/api.response'
import { NotFoundException } from '@/app/exceptions/notFound.exception'
import { HttpStatus } from '@/util/httStatus'
import { bindAll } from '@/util/helper'
import { HttpException } from '@/app/exceptions/http.exception'

export class ProductController {
  protected product: typeof ProductRepository

  constructor() {
    this.product = ProductRepository
    bindAll(ProductController, this)
  }

  index(req: Request, res: Response) {
    ProductEmitter.once('test event', ProductEmitter.listenerTest)

    return res.status(200).json('hello word')
  }

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      // @ts-ignore
      const data = await this.product.findById1(id)

      return res.json(success(data))
    } catch (e) {
      console.log(e instanceof NotFoundException)
      console.log(e instanceof HttpException, e)
      if (e instanceof NotFoundException) {
        return res.status(HttpStatus.NOT_FOUND).json(notFound())
      }
      next(e)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.product.create(req.body)
      return res.json(success(data))
    } catch (e) {
      next(e)
    }
  }
}
