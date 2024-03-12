import firebaseApp from "./config";
import { createUserWithEmailAndPassword, AuthError, UserCredential, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

interface SignUpResult {
  userCredential: UserCredential | null;
  error: AuthError | null;
}

export default async function signUp(email: string, password: string): Promise<SignUpResult> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { userCredential, error: null };
  } catch (error: any) {
    return { userCredential: null, error };
  }
}