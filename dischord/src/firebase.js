import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// valid: 5771f0e8e76d437fab9f53ab1013b52f
// valid: ad31668a1ffb41d1bf996971d5be636b
// correct API key: AIzaSyAf-DA_qokjI6KThbHxob9C5AU0ZHM3oLU
// correct projectId: dischord-f6bdb

const firebaseConfig = {
  //apiKey: "AIzaSyAf-DA_qokjI6KThbHxob9C5AU0ZHM3oLU",
  //authDomain: "dischord-f6bdb.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  //storageBucket: "dischord-f6bdb.appspot.com",
  //messagingSenderId: "272277364746",
  //appId: "1:272277364746:web:00664154f844aac9c37ff3",
  //measurementId: "G-NVSN23EZ02",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
