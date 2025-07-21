// app/lib/firebase.js
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';


const aPI_KEY = process.env.NEXT_PUBLIC_API_KEY
const aUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN
const pROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID
const sTORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET
const mESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
const aPP_ID = process.env.NEXT_PUBLIC_APP_ID


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:  aPI_KEY,
    authDomain: aUTH_DOMAIN,
    projectId: pROJECT_ID,
    storageBucket: sTORAGE_BUCKET,
    messagingSenderId: mESSAGING_SENDER_ID,
    appId: aPP_ID 
  };

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}


const db = getFirestore(app);
const storage=getStorage(app);
const auth = getAuth(app);
export { db,storage,auth };