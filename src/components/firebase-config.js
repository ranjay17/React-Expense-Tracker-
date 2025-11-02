// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-WP2T5JiViDvl3gsbMToJV_zFzn9JL6Y",
  authDomain: "expense-tracker-a1e6c.firebaseapp.com",
  projectId: "expense-tracker-a1e6c",
  storageBucket: "expense-tracker-a1e6c.firebasestorage.app",
  messagingSenderId: "253191239749",
  appId: "1:253191239749:web:b8203a0f1e097098bccb2c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
