import * as firebase from 'firebase/app'

export abstract class BaseController {
  protected firebase: any

  constructor() {
    this.firebase = firebase
  }
}
