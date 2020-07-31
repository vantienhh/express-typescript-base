import {Document} from 'mongoose'

export interface TypeBaseRepository<T extends Document = Document> {

}

export interface TypeProductRepository extends TypeBaseRepository {

}
