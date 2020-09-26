import mongoose, { SchemaOptions, model } from 'mongoose';
import { ProductSchema } from '@/types/Models';

function productSchemaOptions(): SchemaOptions {
  const transform = (doc: any, ret: ProductSchema) => {
    return {
      id: ret._id,
      name: ret.name
    };
  };
  return {
    toJSON: {
      transform
    },
    toObject: {
      transform
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  };
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name là bắt buộc'],
      minlength: [2, 'Name phải có ít nhất 2 ký tự']
    }
  },
  productSchemaOptions()
);

export const Product = model<ProductSchema>('products', productSchema);
