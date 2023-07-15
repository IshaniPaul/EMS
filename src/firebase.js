import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAp_A-X_WuSG4n5cdMj3UQKvnwTv6stuZU",
  authDomain: "employee-864a1.firebaseapp.com",
  projectId: "employee-864a1",
  storageBucket: "employee-864a1.appspot.com",
  messagingSenderId: "744605107160",
  appId: "1:744605107160:web:3f043795f1ea1e01f068ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const userAuth = getAuth(app)
