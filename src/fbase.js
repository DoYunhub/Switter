import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiDcZy-1jdmbJSDxzBwRijO0m62198_ag",
  authDomain: "switter-8d673.firebaseapp.com",
  projectId: "switter-8d673",
  storageBucket: "switter-8d673.appspot.com",
  messagingSenderId: "264166122773",
  appId: "1:264166122773:web:1f4f9ff26f6f7edd20f51c",
};
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
