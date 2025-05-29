import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt_zRk8puKQK843Ro9B_5SegOibMXFblY",
  authDomain: "mi-proyecto-iot-b161b.firebaseapp.com",
  projectId: "mi-proyecto-iot-b161b",
  storageBucket: "mi-proyecto-iot-b161b.appspot.com",
  messagingSenderId: "302108382685",
  appId: "1:302108382685:web:3666bc3b9250059704d234"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };