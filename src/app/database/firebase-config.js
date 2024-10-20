import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,addDoc, collection,  getDocs, query, where } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAxvHsPcaa-irXb39Rpdm3a0UZJFbAjkS4",
  authDomain: "team-management-system-4581f.firebaseapp.com",
  projectId: "team-management-system-4581f",
  storageBucket: "team-management-system-4581f.appspot.com",
  messagingSenderId: "32919666108",
  appId: "1:32919666108:web:db1dd54774b1e4c1ed7fb9",

};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, createUserWithEmailAndPassword, db , addDoc, collection ,signInWithEmailAndPassword , getDocs, query, where}
