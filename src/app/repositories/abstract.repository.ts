import { Document, Model, CreateQuery } from 'mongoose'
import { IAbstractRepository } from '@/types/Repositories'
import { NotFoundException } from '@/app/exceptions/notFound.exception'

export abstract class AbstractRepository<T extends Document> implements IAbstractRepository {
  private readonly model: Model<T>

  protected constructor(model: Model<T>) {
    this.model = model
  }

  getModel(): Model<T> {
    return this.model
  }

  create(data: CreateQuery<T>): Promise<T>
  create(data: CreateQuery<T>[]): Promise<T[]>
  create(data: CreateQuery<T> | CreateQuery<T>[]): Promise<T | T[]> {
    // @ts-ignore
    return this.getModel().create(data)
  }

  findById(id: string | number): Promise<T | null> {
    return this.getModel().findById(id).exec()
  }

  /**
   * find record by id. If not, then fail
   *
   * @param {string | number} id
   * @param {(err: any, res: (T | null)) => void} callback
   * @returns {Promise<T>}
   */
  async findOrFail(id: string | number, callback?: (err: any, res: T | null) => void): Promise<T> {
    const result = await this.getModel().findById(id, callback).exec()
    if (result) {
      return result
    }
    throw new NotFoundException()
  }
}
