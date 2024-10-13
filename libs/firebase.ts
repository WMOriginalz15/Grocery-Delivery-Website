// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD12L9ruU6x-dASTDKqf4z4mWO2lcUJ27c",
  authDomain: "e-commerce-e4fab.firebaseapp.com",
  projectId: "e-commerce-e4fab",
  storageBucket: "e-commerce-e4fab.appspot.com",
  messagingSenderId: "155720383125",
  appId: "1:155720383125:web:7feac322925c60056b799c"
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);
export default firbaseApp;