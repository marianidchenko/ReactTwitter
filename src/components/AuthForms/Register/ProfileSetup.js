import {  updateProfile } from 'firebase/auth'
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import "../form.css"

export const ProfileSetup = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        const {
            displayName,
            username,
            imageUrl,
        } = Object.fromEntries(new FormData(e.target));
        updateProfile(user, {
            displayName: displayName + '/' + username,
            photoURL: imageUrl,
        })

        setTimeout(function () { navigate('/'); }, 500);

    };

    return (
        <div className="form-container">
            <h2>Step 2</h2>
            <h1 className="title">Set up your profile</h1>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" className="form-field" name="displayName" placeholder="Display Name" />
                <input type="text" className="form-field" name="username" placeholder="Username" />
                <input type="text" className="form-field" name="imageUrl" placeholder="Image URL" />
                <input type="submit" className="form-btn" defaultValue="Register" />
            </form>
        </div>

    )
}