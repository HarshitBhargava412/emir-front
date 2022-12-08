// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBcPHqDvxXyEgGlLNvf8jrsRnMqR56FySw",
    authDomain: "emi-calculator-fbc7a.firebaseapp.com",
    projectId: "emi-calculator-fbc7a",
    storageBucket: "emi-calculator-fbc7a.appspot.com",
    messagingSenderId: "672298269912",
    appId: "1:672298269912:web:b13348f13fbc8d8a646bad",
    measurementId: "G-RYSL90VT6Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);