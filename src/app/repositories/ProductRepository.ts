import { BaseRepository } from '@/app/repositories/BaseRepository'
import { Product } from '@/app/models/Product'
import { TypeProductRepository } from '@/types/Repository'
import { ProductSchema } from '@/types/Models'

export default new (class ProductRepository extends BaseRepository<ProductSchema> implements TypeProductRepository {
  constructor() {
    super(Product)
  }
})()
