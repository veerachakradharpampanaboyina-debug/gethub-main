
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, memoryLocalCache } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
// Disable persistence to avoid "client is offline" errors in certain environments
const db = initializeFirestore(app, {
  localCache: memoryLocalCache()
});
const storage = getStorage(app);

export { app, auth, db, storage };
