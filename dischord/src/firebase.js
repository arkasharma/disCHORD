import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// correct API key: AIzaSyAf-DA_qokjI6KThbHxob9C5AU0ZHM3oLU

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //authDomain: "dischord-f6bdb.firebaseapp.com",
  projectId: "dischord-f6bdb",
  //storageBucket: "dischord-f6bdb.appspot.com",
  //messagingSenderId: "272277364746",
  appId: "1:272277364746:web:00664154f844aac9c37ff3",
  //measurementId: "G-NVSN23EZ02"
};

export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const db = getFirestore();
