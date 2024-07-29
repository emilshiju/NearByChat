// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
// import { getMessaging ,getToken,onMessage} from "firebase/messaging";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB-H-jhHhTHYriHpC_7FOg1WIbQ-V-XU6c",
//   authDomain: "nearbychat-3e0c8.firebaseapp.com",
//   projectId: "nearbychat-3e0c8",
//   storageBucket: "nearbychat-3e0c8.appspot.com",
//   messagingSenderId: "151747273533",
//   appId: "1:151747273533:web:377e60cb365b853f4a5b54",
//   measurementId: "G-JFK3S5YQ8X"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

// const app = initializeApp(firebaseConfig);
//  const messaging = getMessaging(app);

// export { messaging, getToken, onMessage };






// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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



