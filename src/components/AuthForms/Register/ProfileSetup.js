import { updateProfile } from 'firebase/auth'
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import { upload } from '../../../services/profilePhotoServices'
import * as profileService from "../../../services/profileService"
import "../form.css"

export const ProfileSetup = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState("https://firebasestorage.googleapis.com/v0/b/tweeter-4742e.appspot.com/o/placeholder.jpg?alt=media&token=cb13c14d-d63f-410c-9386-cc7fc449e128");

    const [displayNameError, setDisplayNameError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);

    const { user } = useContext(AuthContext);

    const handleChange = (e) => {
        if (e.target.files[0] && user) {
            setPhoto(e.target.files[0])
        }
    }

    const handleClick = (e) => {
        e.preventDefault()
        upload(photo, user, setLoading)
            .then(photoURL => { setPhotoURL(photoURL) })
    }

    const validateUsername = () => {
        profileService.getByUsername(username)
            .then(snapshot => {
                if (snapshot.size > 0) {
                    setUsernameError("Username already in use.")
                } 
            })
        if (!username.length) {
            setUsernameError("Please enter a username.")
        } else if (username.length < 3) {
            setUsernameError("The username must be atleast 3 characters long.")
        } else {
            setUsernameError(null);
        }
    }

    const validateDisplayName = () => {
        if (!displayName.length) {
            setDisplayNameError("Please enter a display name.")
        } else if (displayName.length < 3) {
            setDisplayNameError("The display name must be atleast 3 characters long.")
        } else {
            setDisplayNameError(null);
        }
    }


    const onSubmit = (e) => {
        e.preventDefault();
        updateProfile(user, {
            displayName: displayName + '/' + username,
            photoURL: photoURL,
        }).then(() => {
            profileService.add({
                "displayName": displayName,
                "username": username,
                "photoURL": photoURL,
                "creationTime": user.metadata.creationTime,
                "bio": "",
                "bannerURL": "https://www.welovesolo.com/wp-content/uploads/2014/10/p18m34024butbj101mkq1pnjqr75-details.jpg",
                "followedBy": [],
                "uid": user.uid,

            })
            navigate('/');
        }).catch((error) => console.log(error));
    };

    return (
        <div className="form-container">
            <h2>Step 2</h2>
            <h1 className="title">Set up your profile</h1>
            <form className="form" onSubmit={onSubmit}>
                <input
                    type="text"
                    className="form-field"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    onBlur={validateDisplayName}
                />
                {displayNameError && <label className="label-error">{displayNameError}</label>}
                <input
                    type="text"
                    className="form-field"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    onBlur={validateUsername}
                />
                {usernameError && <label className="label-error">{usernameError}</label>}
                <label className="image-label" htmlFor="files">Choose Image:
                    <input
                        type="file"
                        className="image-field"
                        name="image"
                        id="files"
                        onChange={handleChange} />
                </label>
                <button className="image-btn" onClick={handleClick}>Upload</button>
                <button type="submit" disabled={loading || displayNameError || usernameError} className="form-btn">Register</button>
            </form>
        </div>

    )
}