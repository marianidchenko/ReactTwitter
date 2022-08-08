import { db } from '../firebase-config';
import { collection, addDoc, getDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const profileCollectionRef = collection(db, "profile-info");

export const add = (newProfile) => {
    addDoc(profileCollectionRef, newProfile)
}

export const getByUsername = (username) => {
    const q = query(profileCollectionRef, where("username", "==", username));
    return getDocs(q)
}

export const update = (id, updatedProfile) => {
    const profileRef = doc(db, "profile-info/" + id);
    return updateDoc(profileRef, updatedProfile);
}