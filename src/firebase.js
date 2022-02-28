// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyDGBtif6xt9ZBQ94KgR-DVQRYoq52EJ7yk",
    authDomain: "whatsapp-clone-7b9d5.firebaseapp.com",
    projectId: "whatsapp-clone-7b9d5",
    storageBucket: "whatsapp-clone-7b9d5.appspot.com",
    messagingSenderId: "434250059040",
    appId: "1:434250059040:web:f69c6c729675d5975a9b45",
    measurementId: "G-P8EQ0XRDC0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db=firebase.firestore()
  const auth=firebase.auth()
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider,firebaseApp};
  export default db;