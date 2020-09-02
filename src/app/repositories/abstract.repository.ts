import { Document, Model, FilterQuery, UpdateQuery, QueryFindOneAndUpdateOptions, Aggregate } from 'mongoose'
import { TypeBaseRepository } from '@/types/Repository'
import { ProductEmitter } from '@/app/events/product.EventEmitter'
import { NotFoundException } from '@/app/exceptions/notFound.exception'

export abstract class AbstractRepository<T extends Document> implements TypeBaseRepository {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async create(data: any): Promise<any> {
    ProductEmitter.emit('test', 'data ở đây nhé')
    return this.model.create(data)
  }

  async findById(id: string | number | any, callback?: (err: any, res: T | null) => void) {
    const result = await this.model.findById(id, callback).exec()
    if (result) {
      return result
    }
    throw new NotFoundException()
  }

  findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryFindOneAndUpdateOptions = { new: true },
    callback?: (err: any, doc: T | null, res: any) => void
  ) {
    return this.model.findOneAndUpdate(conditions, update, options, callback)
  }

  aggregate<U = any>(aggregate?: any[]): Aggregate<U[]> {
    return this.model.aggregate(aggregate)
  }
}
