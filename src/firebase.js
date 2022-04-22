import firebase from "firebase";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = firebase.initializeApp ({
    apiKey: "AIzaSyAEbD9ycB5oCXYEJ31SRz8ec3g0-Y1UvMQ",
    authDomain: "marketplacechat-a29de.firebaseapp.com",
    projectId: "marketplacechat-a29de",
    storageBucket: "marketplacechat-a29de.appspot.com",
    messagingSenderId: "1023816796126",
    appId: "1:1023816796126:web:110497cd063c6b2a6f7f4f",
    measurementId: "G-W85VXPQ6G1"
  }).auth();