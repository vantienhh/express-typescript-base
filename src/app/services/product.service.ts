import { ProductRepository } from '@/app/repositories/product.repository'
import { IProductRepository } from '@/types/Repositories'
import { IProductService } from '@/types/Services'
import { ProductSchema } from '@/types/Models'

export class ProductService implements IProductService {
  protected product: IProductRepository

  constructor() {
    this.product = new ProductRepository()
  }

  show(id: string | number) {
    // TO DO
    return this.product.findOrFail(id)
  }

  create(data: ProductSchema): Promise<ProductSchema>
  create(data: ProductSchema[]): Promise<ProductSchema[]>
  create(data: ProductSchema | ProductSchema[]): Promise<ProductSchema | ProductSchema[]> {
    // TO DO
    return this.product.create(data)
  }
}
