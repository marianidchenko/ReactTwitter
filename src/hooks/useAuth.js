import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase-config';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const chnage = onAuthStateChanged(auth, user => setCurrentUser(user));
        return chnage;
    }, [])

    return currentUser;
}