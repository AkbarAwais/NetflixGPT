// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAkWIMpUPtSagOGReN9R_x_99S3GRbF-a0",
    authDomain: "netflixgpt-5e8a8.firebaseapp.com",
    projectId: "netflixgpt-5e8a8",
    storageBucket: "netflixgpt-5e8a8.firebasestorage.app",
    messagingSenderId: "470645028660",
    appId: "1:470645028660:web:5cec9d9006c4f08fd71761",
    measurementId: "G-HR9MC7BDNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
