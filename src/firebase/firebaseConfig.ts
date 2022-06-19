// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3M476AxSx1rvHOgvuTN7Lc2gHr1nwThE",
  authDomain: "skv-98.firebaseapp.com",
  projectId: "skv-98",
  storageBucket: "skv-98.appspot.com",
  messagingSenderId: "700522330990",
  appId: "1:700522330990:web:f8383a8ecf623a0c131f7f",
  measurementId: "G-Q5PZDJDL44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
export default storage;
