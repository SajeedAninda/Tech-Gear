// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZysxE_q8bT39SaXDnFFozrY3EY-SMueM",
  authDomain: "tech-gear-49e25.firebaseapp.com",
  projectId: "tech-gear-49e25",
  storageBucket: "tech-gear-49e25.firebasestorage.app",
  messagingSenderId: "902673199035",
  appId: "1:902673199035:web:792ffc88609b92f7a49e9e",
  measurementId: "G-V0VD7HZ0TQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);