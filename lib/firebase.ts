import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

export const firebaseConfigured =
  typeof apiKey === 'string' && apiKey.length > 0 &&
  typeof projectId === 'string' && projectId.length > 0 &&
  typeof databaseURL === 'string' && databaseURL.length > 0;

let app = null;
if (firebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp({
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    databaseURL,
  });
}

export const database = app ? getDatabase(app) : null;
