import { Request } from 'express'

export interface IRequest extends Request {
  user_identification?: {
    uid: string
    email?: string
    is_email_verified?: boolean
  }
}

export interface ResultResponse {
  code: number
  message: string
  data?: any
}

export interface SuccessResponse {
  (data: any, code: number, message: string): ResultResponse
}
