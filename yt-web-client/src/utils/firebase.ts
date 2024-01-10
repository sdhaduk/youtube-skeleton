// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY as string,
  authDomain: process.env.AUTH_DOMAIN as string,
  projectId: process.env.PROJECT_ID as string,
  appId: process.env.APP_ID as string,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};

export const signOut = () => {
  return auth.signOut();
};

export const onAuthStateChangedHelper = (
  callback: (user: User | null) => void
) => {
  return onAuthStateChanged(auth, callback);
};
