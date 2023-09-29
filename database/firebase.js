// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
// import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmZI6nnlTr-da7dQVXMiPxTqDHWjtgMQY",
  authDomain: "odb-sports.firebaseapp.com",
  projectId: "odb-sports",
  storageBucket: "odb-sports.appspot.com",
  messagingSenderId: "291969617098",
  appId: "1:291969617098:web:02a89baaf8affc7e72b833"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
// export const auth = firebase.auth();
export default app;