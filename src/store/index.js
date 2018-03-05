import { createStore, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
// import 'firebase/firestore' // <- needed if using firestore
import rootReducer from '../reducers'

const firebaseConfig = {
  apiKey: "AIzaSyDJg6JlnlyfNnQXt6byrVXYOEm_5MJ6m-Y",
  authDomain: "lichen-ui.firebaseapp.com",
  databaseURL: "https://lichen-ui.firebaseio.com",
  projectId: "lichen-ui",
  storageBucket: "lichen-ui.appspot.com",
  messagingSenderId: "211290057486",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  enableLogging: true,
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig);

// initialize firestore
// firebase.firestore() // <- needed if using firestore

export const configureStore = () => {
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    // reduxFirestore(firebase) // <- needed if using firestore
  )(createStore);

  const initialState = {};
  const store = createStoreWithFirebase(rootReducer, initialState);

  return store;
}
