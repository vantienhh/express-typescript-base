import { ProductSchema } from '@/types/Models'

export interface IProductService {
  show(id: string | number): Promise<ProductSchema>

  create(data: ProductSchema): Promise<ProductSchema>
  create(data: ProductSchema[]): Promise<ProductSchema[]>
  create(data: ProductSchema | ProductSchema[]): Promise<ProductSchema | ProductSchema[]>
}
