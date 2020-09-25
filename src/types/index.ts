import { Request } from 'express';

export type AnyClass = { new (): any };

export interface IRequest extends Request {
  user_identification?: {
    uid: string;
    email?: string;
    is_email_verified?: boolean;
  };
}

export interface IResponse {
  code: number;
  message: string;
  data?: any;
}
