import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBS6SNim5VrFfLiAo3iL_1mW15kqFWc8yE",
  authDomain: "ninja-chat-1ef09.firebaseapp.com",
  databaseURL: "https://ninja-chat-1ef09.firebaseio.com",
  projectId: "ninja-chat-1ef09",
  storageBucket: "ninja-chat-1ef09.appspot.com",
  messagingSenderId: "810764786738",
  appId: "1:810764786738:web:f279d846ed2e5ae49f302b"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp.firestore()