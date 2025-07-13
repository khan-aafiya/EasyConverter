// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD72S02mrPcvu0kIwlA_pJaFAbjW63OUMw",
  authDomain: "easy-convertor.firebaseapp.com",
  projectId: "easy-convertor",
  storageBucket: "easy-convertor.appspot.com",
  messagingSenderId: "166007423308",
  appId: "1:166007423308:web:399a26d3469a276502cfe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
