import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZSpA9YmWxk4kMhmKAjcz2Jdsrk5LTvzI",
  authDomain: "hfbpwa.firebaseapp.com",
  databaseURL: "https://hfbpwa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hfbpwa",
  storageBucket: "hfbpwa.firebasestorage.app",
  messagingSenderId: "270216279261",
  appId: "1:270216279261:web:c31998e207cce5c5781734"
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);