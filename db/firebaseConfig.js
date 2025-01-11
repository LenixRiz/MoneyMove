import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyCVOcpqiR3DXuAI2nADPduUTbETcrtAAJQ",
  authDomain: "moneymove-a9f0c.firebaseapp.com",
  databaseURL: "https://moneymove-a9f0c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "moneymove-a9f0c",
  storageBucket: "moneymove-a9f0c.firebasestorage.app",
  messagingSenderId: "911219193250",
  appId: "1:911219193250:web:33b1d2b86123ff1e4b6efb",
  measurementId: "G-04XWKFQ9TJ"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Use the default app
}

const db = firebase.database();

export { db };