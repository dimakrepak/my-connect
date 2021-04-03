import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBVENZuB5vJoR70WZr2PIyHnU5bODMUAW4",
    authDomain: "social-media-app-8256b.firebaseapp.com",
    projectId: "social-media-app-8256b",
    storageBucket: "social-media-app-8256b.appspot.com",
    messagingSenderId: "368576504400",
    appId: "1:368576504400:web:ece900bb638abde3ce2755",
    measurementId: "G-7V5NLSNC71"

})

const db = firebaseApp.firestore()
export default db