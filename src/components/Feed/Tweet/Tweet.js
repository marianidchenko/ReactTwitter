import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import { DeleteTweet } from './DeleteTweet/DeleteTweet';
import { EditTweet } from './EditTweet/EditTweet';
import { ReplyTweet } from './ReplyTweet/ReplyTweet';
import styles from './Tweet.module.css'
export const Tweet = ({ tweet, replies, setReplies }) => {
    const [currentUsername, setCurrentUsername] = useState("")

    const [tweetControl, setTweetControl] = useState(false);
    const [alert, setAlert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(false);

    const [tweetText, setTweetText] = useState("");
    const [mediaURL, setMediaURL] = useState("");

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onToggleOptions = (e) => {
        e.preventDefault();
        setTweetControl(!tweetControl);
    }

    const onToggleReply = (e) => {
        setReply(!reply);
    }


    const deleteHandler = (e) => {
        setAlert(true);
        setEdit(false);
        setTweetControl(!tweetControl);
    }

    const editHandler = (e) => {
        setTweetControl(!tweetControl);
        setAlert(false);
        setEdit(true);
    }

    const openDetails = (e) => {
        e.preventDefault();
        console.log(tweet)
        if (tweet.isReply == false) {
            navigate(`/tweet/${tweet.id}`);
        } else {
            console.log(tweet.replyTo)
            navigate(`/tweet/${tweet.replyTo}`);
        }

    }

    useEffect(() => {
        if (user) {
            setCurrentUsername(user.displayName.split("/")[1]);
        }
        setTweetText(tweet.tweetText);
        setMediaURL(tweet.mediaURL);

    }, [user, tweet])

    return (
        <Fragment>
            <div className={styles["tweet"]}>
                <img src={tweet.photoURL} alt="" className={styles["tweet-profile-photo"]} onClick={() => { navigate("/" + tweet.username) }} />
                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>{tweet.displayName}</h3>
                    <p className={styles["tweet-username"]}>@{tweet.username}</p>
                    {!edit
                        ?
                        <p className={styles['tweet-text']} onClick={openDetails}>
                            {tweet.isReply && <b className={styles["reply-tag"]}>Replied: </b>}
                            {tweetText}
                            {tweet.mediaURL
                                ? <img
                                    src={mediaURL}
                                    alt=""
                                    className={styles["tweet-media"]} />
                                : ""
                            }
                        </p>
                        : <EditTweet
                            id={tweet.id}
                            tweetText={tweetText} setTweetText={setTweetText}
                            setEdit={setEdit}
                            mediaURL={mediaURL} setMediaURL={setMediaURL}
                            replies={replies}
                            setReplies={setReplies}
                        />
                    }


                </article>
                {user
                    ? <div className={styles["interaction-menu"]}>
                        {!tweet.isReply &&
                            <Link to="" className={styles["interaction-btn"]} onClick={onToggleReply}>
                                <i className="fa-solid fa-message" />
                            </Link>
                        }
                        <Link to="" className={styles["interaction-btn"]}>
                            <i className="fa-solid fa-retweet" />
                        </Link>
                        <Link to="" className={styles["interaction-btn"]}>
                            <i className="fa-solid fa-heart" />
                        </Link>
                        <Link to="" className={styles["interaction-btn"]}>
                            <i className="fa-solid fa-bookmark"></i>
                        </Link>
                        {currentUsername == tweet.username &&
                            <Link to="" className={styles["interaction-btn"]} onClick={onToggleOptions}>
                                <i className="fa-solid fa-ellipsis" />
                            </Link>
                        }
                    </div>
                    : ""
                }
                {reply && <ReplyTweet id={tweet.id} setReply={setReply} replies={replies} setReplies={setReplies} />}
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
                    <DeleteTweet alert={alert} setAlert={setAlert} id={tweet.id} replies={replies} setReplies={setReplies} />

                </div>
            </div>

        </Fragment>
    );
}