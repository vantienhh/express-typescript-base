import {Request, Response} from 'express'
import * as firebase from 'firebase/app'
import {IRequest} from '@/types'

class FirebaseController {
  index = async (req: IRequest, res: Response) => {
    let data = await firebase.database()
            .ref('/users')
            .once('value')

    return res.json(data)
  }

  create = (req: Request, res: Response) => {
    firebase.database().ref('users').push().set([
      {
        username: 'test nhe1',
        email: 'email6',
      }
    ])

    // firebase.database().ref('users/' + 5).set([
    //   {
    //     username: 'name4',
    //     email: 'email4',
    //   },
    //   {
    //     username: 'name5',
    //     email: 'email5',
    //   }
    // ])
    return res.json('firebaseCreate')
  }

  update = (req: Request, res: Response) => {
    let data = 1
    firebase.database().ref('/users/' + 3).on('value', function (snapshot) {
      data = snapshot.val()
    })

    firebase.database().ref().child('users/' + 9).set({
      username: 'username2',
      phone: '098765430000',
    })

    firebase.database().ref('/users').off()
    return res.json(data)
  }
}

export default FirebaseController
