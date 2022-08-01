import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth } from "../firebase-config"

export const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }

}

export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    await signOut(auth)
}