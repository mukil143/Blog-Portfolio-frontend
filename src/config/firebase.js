// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK-EkHWqh8RzS8oGViE8SeI9ZmzSzRdD8",
  authDomain: "blog-app-1b008.firebaseapp.com",
  projectId: "blog-app-1b008",
  storageBucket: "blog-app-1b008.firebasestorage.app",
  messagingSenderId: "577288835697",
  appId: "1:577288835697:web:b435b584758bd64f5e81d0",
  measurementId: "G-7WZR04YGDR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleprovider=new GoogleAuthProvider()