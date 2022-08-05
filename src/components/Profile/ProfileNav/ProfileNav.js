import styles from "./ProfileNav.module.css";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Tweet } from "../../Feed/Tweet/Tweet";

export const ProfileNav = ({tweets}) => {
    return (
        <Fragment>
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
            <div className={styles["display-tweet-container"]}>
                {
                    tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                        />
                    ))}
            </div>
        </Fragment>
    )
}