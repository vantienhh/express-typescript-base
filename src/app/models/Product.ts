import mongoose, { SchemaOptions, model } from 'mongoose';
import { ProductSchema } from '@/types/Models';

function ProductSchemaOptions(): SchemaOptions {
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

const ProductSchema1 = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name là bắt buộc'],
      minlength: [2, 'Name phải có ít nhất 2 ký tự']
    }
  },
  ProductSchemaOptions()
);

export const Product = model<ProductSchema>('products', ProductSchema1);
