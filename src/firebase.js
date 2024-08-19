




import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB-H-jhHhTHYriHpC_7FOg1WIbQ-V-XU6c",
  authDomain: "nearbychat-3e0c8.firebaseapp.com",
  projectId: "nearbychat-3e0c8",
  storageBucket: "nearbychat-3e0c8.appspot.com",
  messagingSenderId: "151747273533",
  appId: "1:151747273533:web:377e60cb365b853f4a5b54",
  measurementId: "G-JFK3S5YQ8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage =getStorage()



