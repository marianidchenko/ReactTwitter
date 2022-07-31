import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth"
import { auth } from "../firebase-config"

export const register = async (email, password) => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)
    } catch (error) {
        console.log(error)
    }

}

export const login = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        console.log(user)
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    await signOut(auth)
}