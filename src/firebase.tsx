import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUncjWnS9vktXR5FM0_ELj-K07cAddPRY",
  authDomain: "soundcloud-scraper.firebaseapp.com",
  databaseURL: "https://soundcloud-scraper.firebaseio.com",
  projectId: "soundcloud-scraper",
  storageBucket: "soundcloud-scraper.appspot.com",
  messagingSenderId: "765747954781",
  appId: "1:765747954781:web:19c182415f2f2e680bf9b4",
  measurementId: "G-J910B52BQJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db ;
