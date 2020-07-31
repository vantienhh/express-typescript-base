import {Document} from 'mongoose'

export interface UserSchema extends Document {
  name: string,
  email: string
}

export interface ProductSchema extends Document {
  name: string
}
