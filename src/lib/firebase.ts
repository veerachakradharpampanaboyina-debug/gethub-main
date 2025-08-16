import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "gradeal-9jnsz",
  "appId": "1:60815705674:web:ad4f748e1687eb1f1848b3",
  "storageBucket": "gradeal-9jnsz.firebasestorage.app",
  "apiKey": "AIzaSyAGPGn89XExnW0kvtgsup4VErQ0Zxl07ao",
  "authDomain": "gradeal-9jnsz.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "60815705674"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
