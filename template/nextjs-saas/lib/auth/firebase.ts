import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
} from "firebase/auth";
import { getApps, initializeApp } from "firebase/app";
import type { AuthAdapter, AuthUser } from "../auth";

const isBrowser = typeof window !== "undefined";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY     ?? "placeholder",
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "placeholder.firebaseapp.com",
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID  ?? "placeholder",
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

function getFirebaseAuth() {
  if (!isBrowser) throw new Error("Firebase Auth est client-side uniquement");
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  return getAuth(app);
}

function toAuthUser(user: User): AuthUser {
  return {
    id:          user.uid,
    email:       user.email,
    displayName: user.displayName,
    photoURL:    user.photoURL,
  };
}

export const firebaseAuthAdapter: AuthAdapter = {
  async getToken() {
    if (!isBrowser) return undefined;
    return getFirebaseAuth().currentUser?.getIdToken();
  },

  getCurrentUser() {
    if (!isBrowser) return null;
    const user = getFirebaseAuth().currentUser;
    return user ? toAuthUser(user) : null;
  },

  async signIn(email, password) {
    await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
  },

  async signInWithProvider(provider) {
    const providers: Record<string, GoogleAuthProvider> = {
      google: new GoogleAuthProvider(),
    };
    const p = providers[provider];
    if (!p) throw new Error(`Provider "${provider}" non supporté`);
    await signInWithPopup(getFirebaseAuth(), p);
  },

  async signOut() {
    await firebaseSignOut(getFirebaseAuth());
  },

  onAuthStateChanged(callback) {
    if (!isBrowser) return () => {};
    return firebaseOnAuthStateChanged(getFirebaseAuth(), (user) =>
      callback(user ? toAuthUser(user) : null),
    );
  },
};
