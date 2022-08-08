import { db, storage } from '../firebase-config';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, where, query, documentId, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from 'uniqid';

const tweetCollectionRef = collection(db, "tweets");

export const add = (newTweet) => {
    return addDoc(tweetCollectionRef, newTweet);
}

export const update = (id, updatedTweet) => {
    const tweetRef = doc(db, "tweets/" + id);
    return updateDoc(tweetRef, updatedTweet);
}

export const remove = (id) => {
    const tweetRef = doc(db, "tweets/" + id);
    return deleteDoc(tweetRef);
}

export const getAll = () => {
    return getDocs(tweetCollectionRef);
}

export const getOne = (id) => {
    const tweetRef = doc(db, "tweets/" + id);
    const docSnap = getDoc(tweetRef);
    return docSnap;
}

export const getByOwner = (uid) => {
    const q = query(tweetCollectionRef, where("ownerId", "==", uid));
    return getDocs(q)
}


export const getLikes = (uid) => {
    const q = query(tweetCollectionRef, where("likedBy", "array-contains", uid));
    return getDocs(q)
}


export const getSaves = (uid) => {
    const q = query(tweetCollectionRef, where("savedBy", "array-contains", uid));
    return getDocs(q)
}

export const getReplies = (id) => {
    const q = query(tweetCollectionRef, where("replyTo", "==", id));
    return getDocs(q)
}

export async function uploadMedia(file, currentUser, setLoading) {
    const fileRef = ref(storage, "tweetMedia/" + uniqid() + ".png");

    const metadata = {
        contentType: 'image/jpeg',
        firebaseStorageDownloadTokens: currentUser.accessToken
    };

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file, metadata);
    const photoURL = await getDownloadURL(fileRef);

    setLoading(false);

    return photoURL;
}