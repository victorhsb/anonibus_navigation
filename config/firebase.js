import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyANjQaWeFLqPiOuvmf-dO2SjPQ3oPbq3Vo",
    authDomain: "anonibus-e22cb.firebaseapp.com",
    databaseURL: "https://anonibus-e22cb.firebaseio.com",
    projectId: "anonibus-e22cb",
    storageBucket: "anonibus-e22cb.appspot.com",
    messagingSenderId: "138485236981",
    appId: "1:138485236981:web:ccce9b97d7d46cddbab1bc",
    measurementId: "G-J27NVXH4FM"
  };

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();