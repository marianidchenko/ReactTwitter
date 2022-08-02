import { db, storage } from '../firebase-config';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, where, query } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import uniqid from 'uniqid';

const tweetCollectionRef = collection(db, "tweets");

export const add = (newTweet) => {
    addDoc(tweetCollectionRef, newTweet);
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

export const getByOwner = (uid) => {
    const q = query(tweetCollectionRef, where("ownerId", "==", uid));
    getDocs(q)
        .then(docs => {console.log(docs)})
}

export async function uploadMedia(file, currentUser, setLoading) {
    const fileRef = ref(storage, "tweetMedia/" +uniqid() + ".png");

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