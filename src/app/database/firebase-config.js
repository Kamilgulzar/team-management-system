import { initializeApp } from "firebase/app";
import { getAuth ,createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore ,addDoc, collection,  getDocs, query, where } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, createUserWithEmailAndPassword, db , addDoc, collection ,signInWithEmailAndPassword , getDocs, query, where}
