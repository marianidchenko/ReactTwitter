import { db } from '../firebase-config';
import { collection, addDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

const profileCollectionRef = collection(db, "profile-info");

export const add = (newProfile) => {
    addDoc(profileCollectionRef, newProfile)
}

export const getByUsername = (username) => {
    const q = query(profileCollectionRef, where("username", "==", username));
    return getDocs(q)
}