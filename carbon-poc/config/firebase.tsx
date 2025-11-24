import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "REDACTED_FIREBASE_API_KEY",
  authDomain: "REDACTED.firebaseapp.com",
  projectId: "REDACTED_FIREBASE_PROJECT_ID",
  storageBucket: "REDACTED.firebasestorage.app",
  messagingSenderId: "REDACTED_FIREBASE_SENDER_ID",
  appId: "REDACTED_FIREBASE_APP_ID",
  measurementId: "REDACTED_FIREBASE_MEASUREMENT_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);