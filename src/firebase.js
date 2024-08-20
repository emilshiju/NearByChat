




import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyARg5ia9_lpCuKOnptjFjl9bAGE2VfXyKI",
  authDomain: "near-by-chat.firebaseapp.com",
  projectId: "near-by-chat",
  storageBucket: "near-by-chat.appspot.com",
  messagingSenderId: "273373396955",
  appId: "1:273373396955:web:147eb76ce4130b710031fe",
  measurementId: "G-VZ7N56F40D"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage =getStorage()



