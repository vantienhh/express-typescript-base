import { AbstractRepository } from '@/app/repositories/abstract.repository'
import { Product } from '@/app/models/Product'
import { TypeProductRepository } from '@/types/Repository'
import { ProductSchema } from '@/types/Models'

export default new (class ProductRepository extends AbstractRepository<ProductSchema> implements TypeProductRepository {
  constructor() {
    super(Product)
  }
})()
