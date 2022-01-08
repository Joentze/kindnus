//firebase configurations
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// const firebaseConfig = {
//     apiKey: "AIzaSyBnu5Xj3ilRQEk2I19IVpTQRrHEN-wPUyo",
//     authDomain: "kindnus2022.firebaseapp.com",
//     projectId: "kindnus2022",
//     storageBucket: "kindnus2022.appspot.com",
//     messagingSenderId: "635048544457",
//     appId: "1:635048544457:web:55b01d16189b739b1ca518",
//     measurementId: "G-PVW0X8CD7R"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyDunG47vaOnyb7fBoludGLxfl94BZLUnQ0",
  authDomain: "kindnus22.firebaseapp.com",
  projectId: "kindnus22",
  storageBucket: "kindnus22.appspot.com",
  messagingSenderId: "844606838354",
  appId: "1:844606838354:web:ca5183dddf75103469b18b",
  measurementId: "G-6PW3KV7TNT",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
