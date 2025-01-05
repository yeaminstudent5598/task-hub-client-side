// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyAwP4ox3EL25ZBxeiAQnGD9ObEeGLOgqv4",
  authDomain: "task-hub-e1fcb.firebaseapp.com",
  projectId: "task-hub-e1fcb",
  storageBucket: "task-hub-e1fcb.firebasestorage.app",
  messagingSenderId: "484533578520",
  appId: "1:484533578520:web:ad9aa32c627db854130c6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;