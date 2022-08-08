import "./tweet-nav.css";

import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import { DeleteTweet } from './DeleteTweet/DeleteTweet';
import { EditTweet } from './EditTweet/EditTweet';
import { ReplyTweet } from './ReplyTweet/ReplyTweet';
import * as tweetServices from "../../../services/tweetServices";
import * as profileServices from "../../../services/profileService";
import styles from './Tweet.module.css'
export const Tweet = ({ tweet, replies, setReplies }) => {
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentTweet, setCurrentTweet] = useState({});
    const [liked, setLiked] = useState();
    const [saved, setSaved] = useState();

    const [tweetControl, setTweetControl] = useState(false);
    const [alert, setAlert] = useState(false);
    const [edit, setEdit] = useState(false);
    const [reply, setReply] = useState(false);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const onToggleOptions = (e) => {
        e.preventDefault();
        setTweetControl(!tweetControl);
    }

    const onToggleReply = (e) => {
        setReply(!reply);
    }

    const onToggleLike = (e) => {
        e.preventDefault();
        if (!currentTweet.likedBy.includes(user.uid)) {
            tweetServices.update(currentTweet.id, { likedBy: [...currentTweet.likedBy, user.uid] });
            setCurrentTweet({ ...currentTweet, likedBy: [...currentTweet.likedBy, user.uid] });
            setLiked(true);
        } else {
            tweetServices.update(currentTweet.id, { likedBy: currentTweet.likedBy.filter(x => x !== user.uid) });
            setCurrentTweet({ ...currentTweet, likedBy: currentTweet.likedBy.filter(x => x !== user.uid) });
            setLiked(false);
        }
    }

    const onToggleSave = (e) => {
        e.preventDefault();
        if (!currentTweet.savedBy.includes(user.uid)) {
            tweetServices.update(currentTweet.id, { savedBy: [...currentTweet.savedBy, user.uid] });
            setCurrentTweet({ ...currentTweet, savedBy: [...currentTweet.savedBy, user.uid] });
            setSaved(true);
        } else {
            tweetServices.update(currentTweet.id, { savedBy: currentTweet.savedBy.filter(x => x !== user.uid) });
            setCurrentTweet({ ...currentTweet, savedBy: currentTweet.savedBy.filter(x => x !== user.uid) });
            setSaved(false);
        }
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
        if (currentTweet.isReply == false) {
            navigate(`/tweet/${currentTweet.id}`);
        } else {
            console.log(tweet.replyTo)
            navigate(`/tweet/${currentTweet.replyTo}`);
        }

    }

    useEffect(() => {
        if (user) {
            const username = user.displayName.split("/")[1];
            profileServices.getByUsername(username).
                then(data => {
                    const profileData = data.docs[0].data();
                    profileData["id"] = data.docs[0].id;
                    setCurrentProfile(profileData);

                    setCurrentTweet(tweet);

                })
        }
    }, []);

    useEffect(() => {
        if (currentTweet) {
            setLiked(currentTweet.likedBy?.includes(user.uid));
            setSaved(currentTweet.savedBy?.includes(user.uid));
        }
    }, [currentTweet]);


    return (
        <Fragment>
            <div className={styles["tweet"]}>
                <img src={currentTweet.photoURL} alt="" className={styles["tweet-profile-photo"]} onClick={() => { navigate("/" + currentTweet.username) }} />
                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>{currentTweet.displayName}</h3>
                    <p className={styles["tweet-username"]}>@{currentTweet.username}</p>
                    {!edit
                        ?
                        <p className={styles['tweet-text']} onClick={openDetails}>
                            {currentTweet.isReply && <b className={styles["reply-tag"]}>Replied: </b>}
                            {currentTweet.tweetText}
                            {currentTweet.mediaURL
                                ? <img
                                    src={currentTweet.mediaURL}
                                    alt=""
                                    className={styles["tweet-media"]} />
                                : ""
                            }
                        </p>
                        : <EditTweet
                            setEdit={setEdit}
                            setCurrentTweet={setCurrentTweet}
                            currentTweet={currentTweet}
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
                        <Link to="" className={styles["interaction-btn"]} onClick={onToggleLike}>
                            {liked
                                ? <i className="fa-solid fa-heart liked" />
                                : <i className="fa-solid fa-heart" />
                            }
                        </Link>
                        <Link to="" className={styles["interaction-btn"]} onClick={onToggleSave}>
                            {saved
                                ? <i className="fa-solid fa-bookmark saved" />
                                : <i className="fa-solid fa-bookmark" />
                            }
                        </Link>
                        {currentProfile.username == tweet.username &&
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