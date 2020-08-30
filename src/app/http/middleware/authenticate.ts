import { NextFunction, Response } from 'express'
import { IRequest } from '@/types'

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
  // const authorization = req.headers['authorization']
  //
  // if (!authorization || !authorization.includes('Bearer ')) {
  //   return res.status(401).json({ error: 'Authorization' })
  // }
  //
  // const token = authorization.split(' ')[1]

  console.log('\x1b[31m%s\x1b[0m', 'authenticate ở đây')

  next()
}
