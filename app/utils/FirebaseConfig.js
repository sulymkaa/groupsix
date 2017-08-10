
//Use firebase database or not
//local - local database
//false - offline
//other - online
const FirebaseDatabaseOnline = 'other';

//Use firebase auth or not
//!Important
//If FirebaseDatabaseOnline is 'local', then this value will be parsed as false
const FirebaseAuthOnline = true;

//Use firebase storage or not
//If FirebaseDatabaseOnline is 'local', then this value will be parsed as false
const FirebaseStorageOnline = true;

// !! Do not modify
const FirebaseConfig = {
  fbAuth: FirebaseDatabaseOnline !== 'local' &&  FirebaseDatabaseOnline !== false && FirebaseAuthOnline !== false,
  fbDatabase: FirebaseDatabaseOnline !== false,
  fbStorage: FirebaseDatabaseOnline !== 'local' &&  FirebaseDatabaseOnline !== false && FirebaseStorageOnline !== false,  

  apiKey: "AIzaSyDqFjPMySs5WFYzPkIYOvFfmbn6f-V3v9k",
	authDomain: "clqsix-9e977.firebaseapp.com",
	databaseURL: FirebaseDatabaseOnline === 'local' ? "ws://localhost.firebaseio.test:5000" : "https://clqsix-9e977.firebaseio.com",
	storageBucket: "clqsix-9e977.appspot.com",
	messagingSenderId: "523390251084",
};

export default FirebaseConfig;