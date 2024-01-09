// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import dotenv from 'dotenv';
// dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9LXocL8zu4MVzbhhL0ogHRbzOAJODuo",
  authDomain: "test-project-3320b.firebaseapp.com",
  projectId: "test-project-3320b",
  storageBucket: "test-project-3320b.appspot.com",
  messagingSenderId: "94744173838",
  appId: "1:94744173838:web:c72efb8885bffaf3944b5f"

//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
