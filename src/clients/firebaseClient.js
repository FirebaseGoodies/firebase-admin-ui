import firebase from 'firebase'

const config = process.env.FIREBASE_CONFIG
const firebaseApp = firebase.initializeApp(config)

export const DATA_LINK = `https://console.firebase.google.com/project/${config.projectId}/database/${config.projectId}/data/`
export const DEFAULT_QUERY = { limitToLast: 100 }

export default {
  database: {
    getDataByRef,
    updateDataByRef,
    deleteDataByRef
  },
  auth: {
    signIn,
    signOut,
    isLoggedIn
  }
}

function getDataByRef (ref, params) {
  let query = firebaseApp.database().ref(ref)
  if (params.orderByChild) query = query.orderByChild(params.orderByChild)
  if (params.limitToFirst && params.limitToLast) {
    console.warn('limitToFirst and limitToLast exist at the same time, only limitToLast will be applied.')
    query = query.limitToLast(params.limitToLast)
  } else {
    if (params.limitToFirst) query = query.limitToFirst(params.limitToFirst)
    if (params.limitToLast) query = query.limitToLast(params.limitToLast)
  }
  if (params.equalTo) query = query.equalTo(params.equalTo)

  return new Promise((resolve, reject) => {
    query.once('value', snapshot => {
      let output = []
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key
        const data = childSnapshot.val()
        const dataType = typeof data
        if (dataType === 'object' && !Array.isArray(data)) {
          output.push(Object.assign({ '.key': key }, data))
        } else {
          output.push({ '.key': key, value: data })
        }
      })
      resolve(output)
    }, error => reject(error))
  })
}

function updateDataByRef (ref, newVal) {
  return firebaseApp.database().ref(ref).set(newVal)
}

function deleteDataByRef (ref) {
  return firebaseApp.database().ref(ref).set(null)
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
