import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBFL6Wk6ckg_CCQCd2Ci0JtgAcsC6XNQxo",
    authDomain: "web-shop-110be.firebaseapp.com",
    databaseURL: "https://web-shop-110be.firebaseio.com",
    projectId: "web-shop-110be",
    storageBucket: "web-shop-110be.appspot.com",
    messagingSenderId: "975113808141",
    appId: "1:975113808141:web:5618ed6e790bb7c8c46844"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        })
      } catch (error) {
        console.log('error creating user', error);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;