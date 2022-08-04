import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import styles from "./Profile.module.css";

export const Profile = () => {

    const { user } = useContext(AuthContext);
    let displayName, username, creationTime;
    const re = /[A-Za-z]{3} \d{4}/

    if (user) {
        [displayName, username] = user.displayName.split("/");
        creationTime = (re.exec(user.metadata.creationTime))[0];
    }

    return (
        <main className={styles["profile-page"]}>
            {user && <Fragment>
                <header className={styles["profile-header"]}>
                    <Link to="/" className={styles["nav-back"]}>
                        <i className="fa-solid fa-arrow-left" />
                    </Link>
                    <div className={styles["profile-info"]}>
                        <h2 className={styles["profile-title"]}>{displayName}</h2>
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
                            src={user.photoURL}
                            alt=""
                            className={styles["profile-photo"]}
                        />
                        <button className={styles["edit-profile-btn"]}>Edit profile</button>
                        <h1 className={styles["profile-name"]}>{displayName}</h1>
                        <p className={styles["profile-username"]}>@{username}</p>
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
                        <nav className={styles["profile-nav"]}>
                            <ul className={styles["nav-ul"]}>
                                <li className={styles["nav-li"]}>
                                    <Link to="" className={styles["profile-link"]}>
                                        Tweets
                                    </Link>
                                </li>
                                <li className={styles["nav-li"]}>
                                    <Link to="" className={styles["profile-link"]}>
                                        Tweets & replies
                                    </Link>
                                </li>
                                <li className={styles["nav-li"]}>
                                    <Link to="" className={styles["profile-link"]}>
                                        Media
                                    </Link>
                                </li>
                                <li className={styles["nav-li"]}>
                                    <Link to="" className={styles["profile-link"]}>
                                        Likes
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </article>
                </div>
            </Fragment>}

        </main>

    )
}