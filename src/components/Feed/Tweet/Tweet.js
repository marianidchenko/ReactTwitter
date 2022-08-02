import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/authContext';
import styles from './Tweet.module.css'
export const Tweet = (props) => {
    const [currentUsername, setCurrentUsername] = useState("")
    const [tweetControl, setTweetControl] = useState(false)
    const { user } = useContext(AuthContext);

    const onToggleOptions = (e) => {
        e.preventDefault();
        setTweetControl(!tweetControl)
    }

    useEffect(() => {
        if (user) {
            setCurrentUsername(user.displayName.split("/")[1])
        }
    }, [user])

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
                        src={props.mediaURL}
                        alt=""
                        className={styles["tweet-media"]} />
                    : ""
                }
            </article>
            {user &&
                <div className={styles["interaction-menu"]}>
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
                    {currentUsername == props.username &&
                        <a href="" className={styles["interaction-btn"]} onClick={onToggleOptions} onBlur={() => setTweetControl(false)}>
                            <i className="fa-solid fa-ellipsis" />
                        </a>
                    }
                </div>
            }
            <div className={styles["interaction-container"]}>
                {tweetControl &&
                    <div className={styles["tweet-card-menu"]}>
                        <button href="" className={styles["btn"]}>
                            Edit Post
                        </button>
                        <button href="" className={styles["btn"]}>
                            Delete Post
                        </button>
                    </div>
                }
            </div>

        </div>
    );
}