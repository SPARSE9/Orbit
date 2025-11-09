import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const missing = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
].filter((k) => !process.env[k])
if (missing.length) {
  // Do not crash the whole app; surface a clear warning instead.
  console.warn(
    `Firebase client env missing: ${missing.join(", ")}. Set them in .env.local and restart the dev server.`
  )
}

let app
if (missing.length === 0) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
} else {
  app = null
}

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null
