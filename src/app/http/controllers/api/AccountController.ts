import 'firebase/auth'
import { Request, Response } from 'express'
import { BaseController } from '@/app/http/controllers/api/BaseController'

class AccountController extends BaseController {
  register = (req: Request, res: Response) => {
    const { email, password } = req.body
    this.firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error: any) {
        console.log('error register', error)
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // ...
      })
    return res.json('register')
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    await this.firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (data: firebase.auth.UserCredential) => {
        const idToken = await data.user?.getIdTokenResult()

        if (idToken) {
          return res.status(200).json({
            token: idToken.token,
            exp: idToken.claims.exp, // thời gian hết hạn
            user_uid: idToken.claims.user_id // uid của user
          })
        }

        return res.status(422).json({ code: 'wrong' })
      })
      .catch(function (error: any) {
        console.log('error login', error)
        // check lỗi login. https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=en
        return res.status(401).json({
          error: 'Wrong'
        })
      })
  }

  logout = (req: Request, res: Response) => {
    this.firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error: any) {
        // An error happened.
      })
    return res.json('logout')
  }
}

export default AccountController
