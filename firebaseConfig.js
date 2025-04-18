// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
//import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw0r0VXgEq_aovq8lDf9bs9EIwtYWhdro",
  authDomain: "startupchatbot-65ee0.firebaseapp.com",
  projectId: "startupchatbot-65ee0",
  storageBucket: "startupchatbot-65ee0.firebasestorage.app",
  messagingSenderId: "843360209866",
  appId: "1:843360209866:web:f2e7a837f0153b6a6fdd33",
  measurementId: "G-2H4025E6F2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
/*
if (typeof window !== "undefined" && isSupported()) {
    const analytics = getAnalytics(app);
  }
*/