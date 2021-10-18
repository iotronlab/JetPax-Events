import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
const firebaseConfig = {
  apiKey: 'AIzaSyBqrOs6baJmiE01TnkUVFcQS1bvRVLslZM',
  authDomain: 'iaa-app-e3f27.firebaseapp.com',
  projectId: 'iaa-app-e3f27',
  storageBucket: 'iaa-app-e3f27.appspot.com',
  messagingSenderId: '1052205198151',
  appId: '1:1052205198151:web:a7ae7e22384726c8f23a62',
  measurementId: 'G-TP8CWVTPY0',
}
// const apps = getApps()
// if (!apps.length) {

// } else {
//   firebaseApp = apps[0]
// }
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export { analytics }
