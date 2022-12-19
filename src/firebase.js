// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
 
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDJMn1zkF8Pxc8U1GA0IkI-yEUr99PTQOY",
  authDomain: "firestore-app-4.firebaseapp.com",
  projectId: "firestore-app-4",
  storageBucket: "firestore-app-4.appspot.com",
  messagingSenderId: "125001269835",
  appId: "1:125001269835:web:45da80abfc7c8d054e83ce",
  measurementId: "G-H5FMXY0VRB"
};

 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);

export {db,app}