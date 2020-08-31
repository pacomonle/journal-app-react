import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// console.log(process.env.REACT_APP_APIKEY)


const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
};


/*
const firebaseConfig = {
    apiKey: "AIzaSyAhp6QRBL_2_haxGm8Jw4FNxKJhw05G2T4",
    authDomain: "journal-app-react-71e65.firebaseapp.com",
    databaseURL: "https://journal-app-react-71e65.firebaseio.com",
    projectId: "journal-app-react-71e65",
    storageBucket: "journal-app-react-71e65.appspot.com",
    messagingSenderId: "215506783450",
    appId: "1:215506783450:web:3afab824adce4f076869e3"
  };

const firebaseConfigTesting = {
  apiKey: "AIzaSyCCRdINXkpN-X9EUOlm3XWfmgp8e1bB3QE",
  authDomain: "data-base-testing.firebaseapp.com",
  databaseURL: "https://data-base-testing.firebaseio.com",
  projectId: "data-base-testing",
  storageBucket: "data-base-testing.appspot.com",
  messagingSenderId: "795836391122",
  appId: "1:795836391122:web:d121de39f1b09431f0170b"
};

console.log(process.env)

if( process.env.NODE_ENV === 'test' ) {
    // testing -> firbebase database de testing
    firebase.initializeApp(firebaseConfigTesting );
   } else {
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}
 
*/

 firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore()
  const auth = firebase.auth()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  
  export { firebase, db , auth, googleAuthProvider }