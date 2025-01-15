// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDomveE1kJOk1n0NENECzimrfHfdlStPII",
  authDomain: "crudtutorial-bffed.firebaseapp.com",
  projectId: "crudtutorial-bffed",
  storageBucket: "crudtutorial-bffed.firebasestorage.app",
  messagingSenderId: "154340226123",
  appId: "1:154340226123:web:edb21c1472f39ff89a09ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
