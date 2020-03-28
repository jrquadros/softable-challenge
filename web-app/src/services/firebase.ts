import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyCMDR95hNvfcJ4en5gaxjIp9T49FktokUw',
  authDomain: 'softable-challenge.firebaseapp.com',
  databaseURL: 'https://softable-challenge.firebaseio.com',
  projectId: 'softable-challenge',
  storageBucket: 'softable-challenge.appspot.com',
  messagingSenderId: '202488731637',
  appId: '1:202488731637:web:e4859b77e480aaeed2f2bc',
  measurementId: 'G-PL227GKZ4K',
}

firebase.initializeApp(firebaseConfig)

export default firebase
