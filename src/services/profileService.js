import { db } from '../firebase-config';
import { collection, addDoc, getDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const profileCollectionRef = collection(db, "profile-info");

export const add = (newProfile) => {
    addDoc(profileCollectionRef, newProfile)
}


export const getByUid = (uid) => {
    const q = query(profileCollectionRef, where("uid", "==", uid));
    return getDocs(q)
}

export const getByUsername = (username) => {
    const q = query(profileCollectionRef, where("username", "==", username));
    return getDocs(q)
}

export const update = (id, updatedProfile) => {
    const profileRef = doc(db, "profile-info/" + id);
    return updateDoc(profileRef, updatedProfile);
}

export const getFollowing = (uid) => {
    const profileRef = doc(db, "profile-info/" + uid);
    const q = query(profileCollectionRef, where("followedBy", "array-contains", uid));
    return getDocs(q);
}