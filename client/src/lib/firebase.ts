// firebase.js or firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCE4mXfv6POrB5BI0rdRG1xqhjTmdBHJqg",
  authDomain: "hacknight-9df7d.firebaseapp.com",
  projectId: "hacknight-9df7d",
  storageBucket: "hacknight-9df7d.appspot.com",
  messagingSenderId: "76709410323",
  appId: "1:76709410323:web:e890e240a0b39f35a4f1e6",
  measurementId: "G-HW75LS2LLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default {db, app};