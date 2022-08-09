import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import styles from "./ProfileEdit.module.css"
import * as profileServices from "../../../services/profileService"
import * as profilePhotoServices from "../../../services/profilePhotoServices"
import { updateProfile } from "firebase/auth"

export const ProfileEdit = () => {
    const { user } = useContext(AuthContext);
    const { profile, setProfile, setEditMode } = useContext(ProfileContext);
    const [displayName, setDisplayName] = useState();
    const [bio, setBio] = useState();

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bannerFile = formData.get('banner');
        const photoFile = formData.get('photo');
        console.log(bannerFile, photoFile)
        if (bannerFile.size > 0) {
            profilePhotoServices.uploadBanner(bannerFile, user)
                .then((bannerURL) => { 
                    profileServices.update(profile.id, {bannerURL})
                    setProfile({...profile, bannerURL})
                 })
        }
        if (photoFile.size > 0) {
            profilePhotoServices.upload(photoFile, user, () => { })
                .then((photoURL) => { 
                    profileServices.update(profile.id, {photoURL}) 
                    setProfile({...profile, photoURL})
                    updateProfile(user, {photoURL})
                })
        }
        updateProfile(user, {
            displayName: `${displayName}/${profile.username}`
        })
        profileServices.update(profile.id, {displayName, bio});
        setProfile({...profile, displayName, bio})
        setEditMode(false);
    }

    useEffect(() => {
        setDisplayName(profile.displayName);
        setBio(profile.bio);
    }, [profile])

    return (
        <main className={styles["edit-page"]}>
            <header className={styles["edit-header"]}>
                <Link to="" className={styles["nav-back"]} onClick={() => setEditMode(false)}>
                    <i className="fa-solid fa-x" />
                </Link>
                <h2 className={styles["edit-title"]}>Edit</h2>
            </header>
            <div className={styles["edit-card"]}>
                <img
                    src={profile.bannerURL}
                    alt=""
                    className={styles["banner"]}
                />
                <form className={styles["edit-details"]} onSubmit={handleEdit}>
                    <img
                        src={profile.photoURL}
                        alt=""
                        className={styles["edit-photo"]}
                    />
                    <label htmlFor="edit-banner-field" className={styles["edit-banner-label"]}>
                        <i className="fa-solid fa-camera" />
                    </label>
                    <input type="file" id="edit-banner-field" className={styles["edit-banner-field"]} name="banner" />
                    <label htmlFor="edit-photo-field" className={styles["edit-photo-label"]}>
                        <i className="fa-solid fa-camera" />
                    </label>
                    <input type="file" id="edit-photo-field" className={styles["edit-photo-field"]} name="photo" />
                    <label htmlFor="" className={styles["edit-label"]}>
                        Display Name:
                    </label>
                    <input type="text" className={styles["edit-field"]} value={displayName} onChange={(e) => setDisplayName(e.target.value)} name="displayName" />
                    <label className={styles["edit-label"]}>Bio:</label>
                    <textarea className={styles["edit-field"]} value={bio} onChange={(e) => setBio(e.target.value)} name="bio" />
                    <button type="submit" className={styles["edit-btn"]}>Edit</button>
                </form>
            </div>
        </main>
    )
}