// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDiPtwz8pgOKn8O2FWidEN7lQhygqIeTIk",
    authDomain: "auth-practice-project-ba077.firebaseapp.com",
    projectId: "auth-practice-project-ba077",
    storageBucket: "auth-practice-project-ba077.appspot.com",
    messagingSenderId: "1073706154522",
    appId: "1:1073706154522:web:6d614b1d8065c8c07aefa3",
    measurementId: "G-0ER6SWB2H7"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  //const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
