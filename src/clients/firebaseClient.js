import firebase from 'firebase'

const config = process.env.FIREBASE_CONFIG
const firebaseApp = firebase.initializeApp(config)

export const DATA_LINK = `https://console.firebase.google.com/project/${config.projectId}/database/${config.projectId}/data/`

export default {
  database: {
    getDataByRef
  },
  auth: {
    signIn,
    signOut,
    isLoggedIn
  }
}

function getDataByRef (ref) {
  return new Promise((resolve, reject) => {
    firebaseApp.database().ref(ref)
      .on('value', snapshot => {
        const data = snapshot.val()
        resolve(Object.keys(data).map(key => {
          return Object.assign({ '.key': key }, data[key])
        }))
      }, error => {
        reject(error)
      })
  })
}

function signIn () {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(provider)
}

function signOut () {
  return firebase.auth().signOut()
}

function isLoggedIn () {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve()
      } else {
        reject(new Error('No logged in user found'))
      }
    })
  })
}
