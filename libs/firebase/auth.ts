import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { firebaseAuth } from './config';
import admin from './firebaseAdmin';

// Define types
type AuthStateChangedCallback = (authUser: User | null) => void;

// Function to handle authentication state changes
export function onAuthStateChanged(callback: AuthStateChangedCallback) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

// Function to sign in with Google
export async function signInWithGoogle(): Promise<string | undefined> {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }

    return result.user.uid;
  } catch (error) {
    console.error('Error signing in with Google', error);
    return undefined;
  }
}

// Function to sign out with Google
export async function signOutWithGoogle(): Promise<void> {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    console.error('Error signing out with Google', error);
  }
}

// Function to verify Firebase ID token
export async function verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Unauthorized');
  }
}
