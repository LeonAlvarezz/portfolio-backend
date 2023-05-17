const firebase = require('firebase/compat/app');
require('firebase/compat/firestore')
require('dotenv').config()


const firebaseConfig = {
    apiKey: process.env.API_KEYS,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

// Initialize Firebase app
const fireBaseApp = firebase.initializeApp(firebaseConfig);
var db = fireBaseApp.firestore();


// Export the initialized Firebase app and Firestore instance
module.exports = {
  db
};