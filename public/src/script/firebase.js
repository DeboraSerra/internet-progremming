import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_APP_API_KEY,
  authDomain: "tech-tide-to-do.firebaseapp.com",
  databaseURL: "https://tech-tide-to-do-default-rtdb.firebaseio.com",
  projectId: "tech-tide-to-do",
  storageBucket: "tech-tide-to-do.appspot.com",
  messagingSenderId: "778868147570",
  appId: "1:778868147570:web:bcef5b1aaa5f27e1b589eb",
};

console.log({ firebaseConfig })

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
