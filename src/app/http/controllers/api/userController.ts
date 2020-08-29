import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { User } from '@/app/models/User'
import { UserSchema } from '@/types/Models'

class UserController {
  index = (req: Request, res: Response, next: NextFunction) => {
    User.find()
      .then((users: any) => {
        return res.json({ users })
      })
      .catch(next)
  }

  store = (req: Request, res: Response, next: NextFunction) => {
    const data = {
      name: 'name',
      email: 'test@gmail.com'
    }
    User.create(data)
      .then((user: UserSchema) => {
        return res.json({ user })
      })
      .catch(next)
  }
}

export default UserController
