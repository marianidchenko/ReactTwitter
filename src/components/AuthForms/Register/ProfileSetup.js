import { updateProfile } from 'firebase/auth'
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import { upload } from '../../../services/profilePhotoServices'
import * as profileService from "../../../services/profileService"
import "../form.css"

export const ProfileSetup = () => {
    const navigate = useNavigate();
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const handleChange = (e) => {
        if (e.target.files[0] && user) {
            setPhoto(e.target.files[0])
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        upload(photo, user, setLoading)
            .then(photoURL => { setPhoto(photoURL) })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const {
            displayName,
            username,
        } = Object.fromEntries(new FormData(e.target));
        updateProfile(user, {
            displayName: displayName + '/' + username,
        }).then(() => {
            profileService.add({
                "displayName": displayName,
                "username": username,
                "photoURL": photo,
                "creationTime": user.metadata.creationTime,
                "bio": "",
                "bannerURL": "https://www.welovesolo.com/wp-content/uploads/2014/10/p18m34024butbj101mkq1pnjqr75-details.jpg",
            })
            navigate('/');
        }).catch((error) => console.log(error));
    };

    return (
        <div className="form-container">
            <h2>Step 2</h2>
            <h1 className="title">Set up your profile</h1>
            <form className="form" onSubmit={onSubmit}>
                <input type="text" className="form-field" name="displayName" placeholder="Display Name" />
                <input type="text" className="form-field" name="username" placeholder="Username" />
                <label className="image-label" htmlFor="files">Choose Image:<input type="file" className="image-field" name="image" id="files" onChange={handleChange} /></label>
                <button className="image-btn" onClick={handleClick}>Upload</button>
                <input type="submit" disabled={loading || !photo} className="form-btn" defaultValue="Register" />
            </form>
        </div>

    )
}