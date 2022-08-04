import { Fragment, useContext } from "react"
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { ProfileNav } from "../ProfileNav/ProfileNav";
import { AuthContext } from "../../../contexts/authContext";


export const ProfileCard = ({ profile }) => {
    const { user } = useContext(AuthContext)
    const re = /[A-Za-z]{3} \d{4}/
    const creationTime = (re.exec(profile.creationTime))[0];

    return (
        <div className={styles["profile-page"]}>
            <header className={styles["profile-header"]}>
                <Link to="/" className={styles["nav-back"]}>
                    <i className="fa-solid fa-arrow-left" />
                </Link>
                <div className={styles["profile-info"]}>
                    <h2 className={styles["profile-title"]}>{profile.displayName}</h2>
                    <p className={styles["tweet-count"]}>0 Tweets</p>
                </div>
            </header>
            <div className={styles["profile-card"]}>
                <img
                    src="https://www.welovesolo.com/wp-content/uploads/2014/10/p18m34024butbj101mkq1pnjqr75-details.jpg"
                    alt=""
                    className={styles["banner"]}
                />
                <article className={styles["profile-details"]}>
                    <img
                        src={profile.photoURL}
                        alt=""
                        className={styles["profile-photo"]}
                    />
                    {profile.username == user.displayName.split("/")[1]
                        ? <button className={styles["edit-profile-btn"]}>Edit profile</button>
                        : <button className={styles["edit-profile-btn"]}>Follow</button>
                    }

                    <h1 className={styles["profile-name"]}>{profile.displayName}</h1>
                    <p className={styles["profile-username"]}>@{profile.username}</p>
                    <p className={styles["profile-joined-date"]}>
                        <i className="fa-solid fa-calendar-days" />
                        Created {creationTime}
                    </p>
                    <div className={styles["followers"]}>
                        <p className={styles["followers-info"]}>
                            <b className={styles["follower-count"]}>2</b> Following
                        </p>
                        <p className={styles["followers-info"]}>
                            <b className={styles["follower-count"]}>0</b> Followers
                        </p>
                    </div>
                    <ProfileNav />
                </article>
            </div>
        </div>
    )
}