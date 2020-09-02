import { AbstractRepository } from '@/app/repositories/abstract.repository'
import { Product } from '@/app/models/Product'
import { IProductRepository } from '@/types/Repositories'
import { ProductSchema } from '@/types/Models'

export class ProductRepository extends AbstractRepository<ProductSchema> implements IProductRepository {
  constructor() {
    super(Product)
  }
}
