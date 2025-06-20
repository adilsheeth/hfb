import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "./config";
import { ref, set } from "firebase/database";


export const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

export const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => {
    return signOut(auth);
}

export const createUserRecord = async (user, details) => {
    const uid = user.uid; 
    set(ref(db, 'users/' + uid), {
        email: details.email,
        name: details.name,
        phone: details.phone,
        address: details.address,
        orders: [""],
    });
} 


//TODO: Pwd Reset, Change, Verification Email