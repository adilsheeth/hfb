import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";


export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOut = () => {
    return auth.signOut();
}

//TODO: Pwd Reset, Change, Verification Email