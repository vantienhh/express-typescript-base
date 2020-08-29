import { check } from 'express-validator'

export const validateCreateProduct = () => {
  return [check('user.email').isEmail()]
}
