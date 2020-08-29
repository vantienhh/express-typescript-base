import { Document, Model, FilterQuery, UpdateQuery, QueryFindOneAndUpdateOptions, Aggregate } from 'mongoose'
import { TypeBaseRepository } from '@/types/Repository'
import { ProductEmitter } from '@/app/events/ProductEventEmitter'

export abstract class BaseRepository<T extends Document> implements TypeBaseRepository {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  public async create(data: any): Promise<any> {
    ProductEmitter.emit('test', 'data ở đây nhé')
    return this.model.create(data)
  }

  public async findOneAndUpdate(
    conditions: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryFindOneAndUpdateOptions = { new: true },
    callback?: (err: any, doc: T | null, res: any) => void
  ) {
    return this.model.findOneAndUpdate(conditions, update, options, callback)
  }

  public async aggregate<U = any>(aggregate?: any[]): Aggregate<U[]> {
    return this.model.aggregate(aggregate)
  }
}
