import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
const firebaseConfig = {
  apiKey: 'AIzaSyApC_Sk60JJyicwpLHghWlBCtKItMABa5E',
  authDomain: 'jetpax-370115.firebaseapp.com',
  projectId: 'jetpax-370115',
  storageBucket: 'jetpax-370115.appspot.com',
  messagingSenderId: '516187460545',
  appId: '1:516187460545:web:e383071b8c81779bfad540',
  measurementId: 'G-B3X4Y778XD',
}
// const apps = getApps()
// if (!apps.length) {

// } else {
//   firebaseApp = apps[0]
// }
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export { analytics }
