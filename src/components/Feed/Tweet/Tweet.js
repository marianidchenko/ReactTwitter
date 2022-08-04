import { Fragment, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../contexts/authContext';
import { DeleteTweet } from './DeleteTweet/DeleteTweet';
import { EditTweet } from './EditTweet/EditTweet';
import styles from './Tweet.module.css'
export const Tweet = (props) => {
    const [currentUsername, setCurrentUsername] = useState("")
    const [tweetControl, setTweetControl] = useState(false);
    const [alert, setAlert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [tweetText, setTweetText] = useState(props.tweetText);
    const { user } = useContext(AuthContext);

    const onToggleOptions = (e) => {
        e.preventDefault();
        setTweetControl(!tweetControl)
    }

    const deleteHandler = (e) => {
        setAlert(!alert);
        setTweetControl(!tweetControl);
    }

    const editHandler = (e) => {
        setEdit(true);
    }

    useEffect(() => {
        if (user) {
            setCurrentUsername(user.displayName.split("/")[1])
        }
    }, [user])

    return (
        <Fragment>
            <div className={styles["tweet"]}>
                <img src={props.photoURL} alt="" className={styles["tweet-profile-photo"]} />

                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>{props.displayName}</h3>
                    <p className={styles["tweet-username"]}>@{props.username}</p>
                    {!edit
                        ?
                        <p className={styles['tweet-text']}>
                            {tweetText}
                        </p>
                        : <EditTweet id={props.id} tweetText={tweetText} setTweetText={setTweetText} setEdit={setEdit}/>
                    }

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
                            <a href="" className={styles["interaction-btn"]} onClick={onToggleOptions}>
                                <i className="fa-solid fa-ellipsis" />
                            </a>
                        }
                    </div>
                }
                <div className={styles["interaction-container"]}>
                    {tweetControl &&
                        <div className={styles["tweet-card-menu"]}>
                            <button className={styles["btn"]} onClick={editHandler}>
                                Edit Post
                            </button>
                            <button className={styles["btn"]} onClick={deleteHandler}>
                                Delete Post
                            </button>
                        </div>
                    }
                    <DeleteTweet alert={alert} setAlert={setAlert} id={props.id} />

                </div>
            </div>

        </Fragment>
    );
}