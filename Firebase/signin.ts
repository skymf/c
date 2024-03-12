import { signInWithEmailAndPassword, AuthError, UserCredential, getAuth } from "firebase/auth";
import firebaseApp from "./config";

const auth = getAuth(firebaseApp);

interface SignInResult {
  userCredential: UserCredential | null;
  error: AuthError | null;
}

export default async function signIn(email: string, password: string): Promise<SignInResult> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { userCredential, error: null };
  } catch (error: any) {
    return { userCredential: null, error };
  }
}
