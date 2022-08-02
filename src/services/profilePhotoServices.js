import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase-config";


export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, "profile/" + currentUser.uid + '.png');

    const metadata = {
        contentType: 'image/jpeg',
        firebaseStorageDownloadTokens: currentUser.accessToken
      };

    setLoading(true);

    const snapshot = await uploadBytes(fileRef, file, metadata);
    const photoURL = await getDownloadURL(fileRef);

    updateProfile(currentUser, { photoURL });

    setLoading(false);
}