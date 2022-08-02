import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext';
import styles from './Tweet.module.css'
export const Tweet = (props) => {
    const { user } = useContext(AuthContext);
    return (
        <div className={styles["tweet"]}>
            <img src={props.photoURL} alt="" className={styles["tweet-profile-photo"]} />
            <article className={styles['tweet-contents']}>
                <h3 className={styles["tweet-name"]}>{props.displayName}</h3>
                <p className={styles["tweet-username"]}>@{props.username}</p>
                <p className={styles['tweet-text']}>
                    {props.tweetText}
                </p>
                {props.mediaURL
                    ? <img
                        src="https://thumbs.dreamstime.com/b/forrest-27720334.jpg"
                        alt=""
                        className={styles["tweet-media"]} />
                    : ""
                }
            </article>
            {user
                ? <div className={styles["interaction-menu"]}>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-message" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-retweet" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-heart" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-arrow-up-from-bracket" />
                    </a>
                </div>
                : ""
            }

        </div>
    );
}