import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD82yir7pXgGZMOiNiZw3VmSxJKbYpjR8c',
  authDomain: 'crwn-clothing-db-15bc0.firebaseapp.com',
  projectId: 'crwn-clothing-db-15bc0',
  storageBucket: 'crwn-clothing-db-15bc0.appspot.com',
  messagingSenderId: '512323653218',
  appId: '1:512323653218:web:4eee6a1de78af9b0b64b3b',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (user) => {
  const userDocRef = doc(db, 'users', user.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      setDoc(userDocRef, { createdAt, displayName, email });
    } catch (error) {
      console.log(error);
    }
  }
};
