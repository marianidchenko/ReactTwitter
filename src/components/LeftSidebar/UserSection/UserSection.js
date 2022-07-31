import styles from './UserSection.module.css'
import * as authService from "../../../services/authServices"
export const UserSection = ({user}) => {
    const [displayName, username] = user.displayName.split('/');

    return (
        <article className={styles["profile-card"]}>
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
            <div className={styles["profile-card-menu"]}>
                <article className={styles["profile-section"]}>
                    <img
                        src={user.photoURL}
                        alt=""
                        className={styles["profile-photo"]}
                    />
                    <div className={styles["profile-info"]}>
                        <h3 className={styles["profile-name"]}>{displayName}</h3>
                        <p className={styles["profile-handle"]}>@{username}</p>
                    </div>
                </article>
                <button href="" className={styles["logout-btn"]} onClick={authService.logout}>
                    Log out of @{username}
                </button>
            </div>
        </article>
    )
}