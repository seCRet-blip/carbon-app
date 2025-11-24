import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4uMw8rfSn4m0Tu6c4Yq5G9pOoR0yhHX0",
  authDomain: "carbon-app-2006b.firebaseapp.com",
  projectId: "carbon-app-2006b",
  storageBucket: "carbon-app-2006b.firebasestorage.app",
  messagingSenderId: "956630781092",
  appId: "1:956630781092:web:ba299db972309e6e4b6a31",
  measurementId: "G-5EF3DQ9XCC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);