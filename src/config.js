//firebase configurations
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyDunG47vaOnyb7fBoludGLxfl94BZLUnQ0",
    authDomain: "kindnus22.firebaseapp.com",
    projectId: "kindnus22",
    storageBucket: "kindnus22.appspot.com",
    messagingSenderId: "844606838354",
    appId: "1:844606838354:web:ca5183dddf75103469b18b",
    measurementId: "G-6PW3KV7TNT"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
export default db