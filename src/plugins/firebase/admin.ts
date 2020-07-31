import * as admin from 'firebase-admin'

export const adminFirebase = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.FIREBASE_DATABASEURL || 'https:// project-id .firebaseio.co'
})
