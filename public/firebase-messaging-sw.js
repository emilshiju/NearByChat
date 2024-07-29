

// Inside firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.9.3/firebase-messaging.js');




import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";


const firebaseConfig = {
  apiKey: "AIzaSyB-H-jhHhTHYriHpC_7FOg1WIbQ-V-XU6c",
  authDomain: "nearbychat-3e0c8.firebaseapp.com",
  projectId: "nearbychat-3e0c8",
  storageBucket: "nearbychat-3e0c8.appspot.com",
  messagingSenderId: "151747273533",
  appId: "1:151747273533:web:377e60cb365b853f4a5b54",
  measurementId: "G-JFK3S5YQ8X"
};









// console.log("firebaseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

// const app = initializeApp(firebaseConfig);
// const messaging = firebaseConfig.messaging();


onBackgroundMessage((payload) => {
  alert("vnau")
  console.log('[firebase-messaging-sw.js] Received background message 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

