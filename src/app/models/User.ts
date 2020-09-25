import mongoose, { SchemaOptions, model } from 'mongoose';
import { UserSchema } from '@/types/Models';

function userSchemaOptions(): SchemaOptions {
  const transform = (doc: any, ret: UserSchema) => {
    return {
      id: ret._id,
      name: ret.name,
      email: ret.email
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

const UserSchema1 = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name là bắt buộc'],
      minlength: [2, 'Name phải có ít nhất 2 ký tự'],
      maxlength: [50, 'Name có tối đa 50 ký tự']
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Email là bắt buộc']
    }
  },
  userSchemaOptions()
);

export const User = model<UserSchema>('users', UserSchema1);
