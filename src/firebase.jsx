// Import necessary functions from Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Use the correct import for Firebase Auth

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCMkJwvNisr2OTLfg619o245QPQYZ4jqtA",
  authDomain: "scrapauth.firebaseapp.com",
  projectId: "scrapauth",
  storageBucket: "scrapauth.firebasestorage.app",
  messagingSenderId: "195227893076",
  appId: "1:195227893076:web:3b9b4e268eaaf34c0a9cc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const scrapauth = getAuth(app);

// Export the Firebase auth instance so you can use it in other files
export { scrapauth };
