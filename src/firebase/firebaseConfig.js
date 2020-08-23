import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAhp6QRBL_2_haxGm8Jw4FNxKJhw05G2T4",
    authDomain: "journal-app-react-71e65.firebaseapp.com",
    databaseURL: "https://journal-app-react-71e65.firebaseio.com",
    projectId: "journal-app-react-71e65",
    storageBucket: "journal-app-react-71e65.appspot.com",
    messagingSenderId: "215506783450",
    appId: "1:215506783450:web:3afab824adce4f076869e3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  
  export { firebase, db , auth, googleAuthProvider }