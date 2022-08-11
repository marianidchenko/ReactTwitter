import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/authContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import styles from "./ProfileEdit.module.css"
import { updateProfileService } from "../../../services/updateProfileService"

export const ProfileEdit = () => {
    const { user } = useContext(AuthContext);
    const { profile, setProfile, setEditMode } = useContext(ProfileContext);
    const [loading, setLoading] = useState(false)

    const handleEdit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateProfileService(formData, user, profile, setProfile, setLoading, setEditMode);
    }

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
                    <input type="text" className={styles["edit-field"]} defaultValue={profile.displayName} name="displayName" />
                    <label className={styles["edit-label"]}>Bio:</label>
                    <textarea className={styles["edit-field"]} defaultValue={profile.bio} name="bio" />
                    <button type="submit" className={styles["edit-btn"]} disabled={loading}>Edit</button>
                </form>
            </div>
        </main>
    )
}