// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZFarUPqjvJdRiI3SGWRv3XAXovnnVRF8",
  authDomain: "easy-converter-1.firebaseapp.com",
  projectId: "easy-converter-1",
  storageBucket: "easy-converter-1.firebasestorage.app",
  messagingSenderId: "1052294730212",
  appId: "1:1052294730212:web:dff2c38b3abf7b5224b7f1",
  measurementId: "G-ZL8VGW8RHL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
