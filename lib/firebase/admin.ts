import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

import { isFirebaseAdminConfigured } from "./config";

let adminApp: App | undefined;

function ensureAdminApp(): App {
  if (!isFirebaseAdminConfigured) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY in .env.local."
    );
  }
  if (!adminApp) {
    adminApp =
      getApps()[0] ??
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          // .env files store the key with literal \n escapes — restore real newlines.
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
  }
  return adminApp;
}

export function getAdminAuth(): Auth {
  return getAuth(ensureAdminApp());
}

export function getAdminDb(): Firestore {
  return getFirestore(ensureAdminApp());
}

export function getAdminStorage(): Storage {
  return getStorage(ensureAdminApp());
}
