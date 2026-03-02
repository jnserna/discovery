import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when real Firebase credentials are present in env */
export const isFirebaseConfigured = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _app: any = null;
if (isFirebaseConfigured) {
  try {
    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  } catch {
    // swallow – will surface as "not configured" to callers
  }
}

const app = _app;
// These are null when Firebase is not configured; callers guard via isFirebaseConfigured
export const auth = app ? getAuth(app) : null!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
export const db = app ? getFirestore(app) : null!;
export const storage = app ? getStorage(app) : null!;
export default app;
