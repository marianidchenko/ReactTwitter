import { db, storage } from '../firebase-config';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const tweetCollectionRef = collection(db, "tweets");

export const add = (newTweet) => {
    return addDoc(tweetCollectionRef, newTweet);
}

export const update = (id, updatedTweet) => {
    const tweetRef = getDoc(db, "tweets", id);
    return updateDoc(tweetRef, updatedTweet);
}

export const remove = (id) => {
    const tweetRef = getDoc(db, "tweets", id);
    return deleteDoc(tweetRef);
}

export const getAll = () => {
    return getDocs(tweetCollectionRef);
}

export const getOne = (id) => {
    const tweetRef = doc(db, "tweets", id);
    return getDoc(tweetRef);
}

export async function uploadMedia(file, currentUser, setLoading) {
    const fileRef = ref(storage);

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