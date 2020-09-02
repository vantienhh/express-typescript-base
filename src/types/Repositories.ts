import { Document, Model, DocumentQuery, CreateQuery } from 'mongoose'
import { ProductSchema } from '@/types/Models'

export interface IAbstractRepository<T extends Document = Document> {
  getModel(): Model<T>

  create(data: CreateQuery<T>): Promise<T>
  create(data: CreateQuery<T>[]): Promise<T[]>
  create(data: CreateQuery<T> | CreateQuery<T>[]): Promise<T | T[]>

  /**
   * find record by id
   * @param {string | number} id
   * @returns {Promise<T | null>}
   */
  findById(id: string | number): Promise<T | null>

  /**
   * find record by id. If not, then fail
   *
   * @param {string | number} id
   * @param {(err: any, res: (T | null)) => void} callback
   * @returns {Promise<DocumentQuery<T | null, T>>}
   */
  findOrFail(id: string | number, callback?: (err: any, res: T | null) => void): Promise<T>
}

export type IProductRepository = IAbstractRepository<ProductSchema>
