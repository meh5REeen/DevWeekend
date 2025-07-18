// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mehreen-estate.firebaseapp.com",
  projectId: "mehreen-estate",
  storageBucket: "mehreen-estate.firebasestorage.app",
  messagingSenderId: "15725563608",
  appId: "1:15725563608:web:ca7bd8241cabc3cc7ed1ad",
  measurementId: "G-6TNE8RH7MQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;