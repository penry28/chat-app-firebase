// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHhNOH-FoFQCZK2Bj_nUrdB8-cyq7vBKg",
  authDomain: "chat-app-firebase-2c50b.firebaseapp.com",
  projectId: "chat-app-firebase-2c50b",
  storageBucket: "chat-app-firebase-2c50b.appspot.com",
  messagingSenderId: "751058515323",
  appId: "1:751058515323:web:e78dd2eba048212487f9de",
  measurementId: "G-6C3L5654QM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");
if (['localhost', '127.0.0.1'].includes(window.location.hostname)) {
  connectFirestoreEmulator(db, 'localhost', 8081);
}

export {
  db,
  auth
};

export default app;
