import styles from "./ProfileNav.module.css";
import { Link } from "react-router-dom";

export const ProfileNav = () => {
    return (
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
    )
}