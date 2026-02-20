"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const isBrowser = typeof window !== "undefined";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY     ?? "placeholder-api-key",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "placeholder.firebaseapp.com",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID  ?? "placeholder-project",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!isBrowser) throw new Error("Firebase can only be used client-side");
  if (!app) app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return app;
}

/**
 * Lazy Firebase Auth — safe to import server-side (SSR / static build).
 * Initializes only when accessed client-side.
 */
export const auth = new Proxy({} as Auth, {
  get(_target, prop) {
    if (!isBrowser) return undefined;
    if (!authInstance) authInstance = getAuth(getFirebaseApp());
    return authInstance[prop as keyof Auth];
  },
});
