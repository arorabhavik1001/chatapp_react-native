import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaL-dbGg7Lrcb3dpqkPrZY5QHiSpP4IBY",
  authDomain: "chat-app-6f0f8.firebaseapp.com",
  projectId: "chat-app-6f0f8",
  storageBucket: "chat-app-6f0f8.appspot.com",
  messagingSenderId: "3973692318",
  appId: "1:3973692318:web:f7f007a6a76f689f46348f",
  measurementId: "G-NXBPFYQT5W",
};

let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();

export { db, auth}