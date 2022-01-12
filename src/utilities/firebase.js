import React, { useState, useEffect }from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvDD0o7ssktMJnMcmfgnvl5z7yqsiOCY8",
    authDomain: "cs394-tutorial-aa74b.firebaseapp.com",
    databaseURL: "https://cs394-tutorial-aa74b-default-rtdb.firebaseio.com",
    projectId: "cs394-tutorial-aa74b",
    storageBucket: "cs394-tutorial-aa74b.appspot.com",
    messagingSenderId: "315120497877",
    appId: "1:315120497877:web:f6177381ed2c03c592de5c",
    measurementId: "G-ZWN4Z9M8XZ"
  };

  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };

  const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
  };


const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

  export const setData = (path, value) => (
    set(ref(database, path), value)
  );