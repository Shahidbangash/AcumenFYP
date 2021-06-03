
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAo0sKakqaRMOGRqY2DsQWH8kX4r44Izjs",
    authDomain: "acumen-9752f.firebaseapp.com",
    projectId: "acumen-9752f",
    storageBucket: "acumen-9752f.appspot.com",
    messagingSenderId: "413105521992",
    appId: "1:413105521992:web:485a172b30c0668d2bdf7d",
    measurementId: "G-MMKT9S1M67"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
