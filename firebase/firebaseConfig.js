import { firebase, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpEIrlSk33I6YJ3fKNryk-1jwmbszZYkU",
  authDomain: "fir-test-app-a7818.firebaseapp.com",
  projectId: "fir-test-app-a7818",
  storageBucket: "fir-test-app-a7818.appspot.com",
  messagingSenderId: "725012410048",
  appId: "1:725012410048:web:068568c5b11effc3c74725",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth();
// export const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ prompt: "select_account" });
