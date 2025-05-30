// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
 apiKey: "AIzaSyBB-LduRQVwEDCWAXJTxeXblXFYQ7K4MVs",
  authDomain: "to-do-list-66802.firebaseapp.com",
  projectId: "to-do-list-66802",
  storageBucket: "to-do-list-66802.firebasestorage.app",
  messagingSenderId: "29412685100",
  appId: "1:29412685100:web:c2efe0a90a16e317f7e889",
  measurementId: "G-FVC5RV39J7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, githubProvider, facebookProvider };

