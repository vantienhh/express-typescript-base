import ProductRepository from '@/app/repositories/ProductRepository'
import {Request, Response} from 'express'
import {ProductEmitter} from '@/app/events/ProductEventEmitter'
import {HTTP_SUCCESS} from '@/config/responseCode'
import {success} from '@/app/http/responses/responseApi'
import {validationResult} from 'express-validator'

class ProductController {
  protected product: typeof ProductRepository

  constructor() {
    this.product = ProductRepository
  }

  create = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log('12312', errors.array())

    ProductEmitter.once('test', ProductEmitter.listenerTest)

    let data = await this.product.create([{name: 'ertyu'}, {name: 'oksokaoaks'}])
    return res.status(HTTP_SUCCESS).json(success(data))
  }
}

export default ProductController
