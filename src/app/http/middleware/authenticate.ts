import {NextFunction, Response} from 'express'
import {adminFirebase} from '@/plugins/firebase/admin'
import {IRequest} from '@/types'

export const authenticate = (req: IRequest, res: Response, next: NextFunction) => {
  let authorization = req.headers['authorization']

  if (!authorization || !authorization.includes('Bearer ')) {
    return res.status(401).json({error: 'Authorization'})
  }

  let token = authorization.split(' ')[1]

  adminFirebase.auth()
               .verifyIdToken(token)
               .then(function (decodedToken) {
                 req.user_identification = {
                   uid: decodedToken.uid,
                   email: decodedToken.email,
                   is_email_verified: decodedToken.email_verified
                 }

                 return next()
               })
               .catch(function (error) {
                 return res.status(401).json({error: 'Authorization'})
               })
}
