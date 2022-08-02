import styles from './UserSection.module.css'
import * as authService from "../../../services/authServices"
import { useState } from 'react';
import { getByOwner } from '../../../services/tweetServices';
export const UserSection = ({ user }) => {
    const [displayName, username] = user.displayName.split('/');
    const [showOptions, setShowOptions] = useState(false)
    const onClick = () => setShowOptions(!showOptions)

    return (
        <article className={styles["profile-card"]} onClick={onClick}>
            <img
                src={user.photoURL}
                alt=""
                className={styles["profile-photo"]}
            />
            <div className={styles["profile-info"]}>
                <h3 className={styles["profile-name"]}>{displayName}</h3>
                <p className={styles["profile-handle"]}>@{username}</p>
            </div>
            <i className="fa-solid fa-ellipsis" />
            {showOptions && 
            <div className={styles["profile-card-menu"]}>
                <article className={styles["menu-profile-section"]}>
                    <img
                        src={user.photoURL}
                        alt=""
                        className={styles["profile-photo"]}
                    />
                    <div className={styles["menu-profile-info"]}>
                        <h3 className={styles["menu-profile-name"]}>{displayName}</h3>
                        <p className={styles["menu-profile-handle"]}>@{username}</p>
                    </div>
                </article>
                <button href="" className={styles["logout-btn"]} onClick={authService.logout}>
                    Log out of @{username}
                </button>
            </div>}

        </article>
    )
}