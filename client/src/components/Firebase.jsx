// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// const {
//   VITE_REACT_APP_FIREBASE_API_KEY,
//   VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
//   VITE_REACT_APP_FIREBASE_PROJECT_ID,
//   VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
//   VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   VITE_REACT_APP_FIREBASE_APP_ID,
// } = import.meta.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: 'AIzaSyAq9LXocL8zu4MVzbhhL0ogHRbzOAJODuo',
  authDomain: 'test-project-3320b.firebaseapp.com',
  projectId: 'test-project-3320b',
  storageBucket: 'test-project-3320b.appspot.com',
  messagingSenderId: '94744173838',
  appId: '1:94744173838:web:c72efb8885bffaf3944b5f',

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
