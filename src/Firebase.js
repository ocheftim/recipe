// src/Firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAxSKTJgzUI4o4lRMukwWFBbXXhq04ii4s",
  authDomain: "recipe-builder-e9697.firebaseapp.com",
  projectId: "recipe-builder-e9697",
  storageBucket: "recipe-builder-e9697.appspot.com", // <-- fix typo here
  messagingSenderId: "631953533396",
  appId: "1:631953533396:web:ee1f32ee067cb2317d8e41"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);