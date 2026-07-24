const firebaseConfig = {
  apiKey: "AIzaSyA-Zoc-1Fb5vOF4OLEK17XrFr4S0A8vkP4",
  authDomain: "npl-bank-panel.firebaseapp.com",
  projectId: "npl-bank-panel",
  storageBucket: "npl-bank-panel.firebasestorage.app",
  messagingSenderId: "493426931778",
  appId: "1:493426931778:web:432e8fa5c0dd66f9ce15db"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();