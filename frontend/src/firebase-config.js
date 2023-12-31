// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAVHb4Np0P9rzkvtvRwZNYYaC6DlReBr58",
  authDomain: "fameo-d8a3e.firebaseapp.com",
  projectId: "fameo-d8a3e",
  storageBucket: "fameo-d8a3e.appspot.com",
  messagingSenderId: "261546461610",
  appId: "1:261546461610:web:13de4b5bdb57d2b02703d3",
  measurementId: "G-N1DQ0PF9G9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
