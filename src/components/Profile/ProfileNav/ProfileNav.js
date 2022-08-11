import styles from "./ProfileNav.module.css";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Tweet } from "../../Feed/Tweet/Tweet";

export const ProfileNav = ({ tweets, profileLikes }) => {
    const [currentTweets, setCurrentTweets] = useState(tweets);
    
    useEffect(() => {
        onTweets()
    }, [tweets]);

    const onTweets = () => {
        setCurrentTweets(tweets.filter(tweet => {
            return tweet.isReply == false;
        }))
    }

    const onTweetsAndReplies = () => {
        setCurrentTweets(tweets);
    };

    const onMedia = () => {
        setCurrentTweets(tweets.filter(tweet => {
            return tweet.mediaURL;
        }))
    };

    const onLikes = () => {
        setCurrentTweets(profileLikes)
    }

    return (
        <Fragment>
            <nav className={styles["profile-nav"]}>
                <ul className={styles["nav-ul"]}>
                    <li className={styles["nav-li"]}>
                        <Link to="" className={styles["profile-link"]} onClick={onTweets}>
                            Tweets
                        </Link>
                    </li>
                    <li className={styles["nav-li"]}>
                        <Link to="" className={styles["profile-link"]} onClick={onTweetsAndReplies}>
                            Tweets & replies
                        </Link>
                    </li>
                    <li className={styles["nav-li"]}>
                        <Link to="" className={styles["profile-link"]} onClick={onMedia}>
                            Media
                        </Link>
                    </li>
                    <li className={styles["nav-li"]}>
                        <Link to="" className={styles["profile-link"]} onClick={onLikes}>
                            Likes
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className={styles["display-tweet-container"]}>
                {
                    currentTweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                            profileView={true}
                        />
                    ))}
            </div>
        </Fragment>
    )
}