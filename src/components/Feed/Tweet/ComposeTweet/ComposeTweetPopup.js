import { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../contexts/authContext'
import { TweetContext } from '../../../../contexts/TweetContext'
import * as tweetServices from "../../../../services/tweetServices"
import styles from './ComposeTweetPopup.module.css'

export const ComposeTweetPopup = () => {
    const { updateTweets, composePopup, setComposePopup } = useContext(TweetContext);
    const { user } = useContext(AuthContext);
    const [incomplete, setIncomplete] = useState("");
    const [tweetText, setTweetText] = useState("");
    const [media, setMedia] = useState("");
    const [upload, setUpload] = useState(null);

    const onTextChange = (e) => {
        setTweetText(e.target.value)
    }

    const onMediaSelect = (e) => {
        setMedia(e.target.value)
        if (e.target.files[0] && user) {
            setUpload(e.target.files[0])
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        let tweet = {
            tweetText,
            timestamp: new Date().getTime() / 1000,
            ownerId: user.uid,
            isReply: false,
            likedBy: [],
            savedBy: [],
        };
        if (upload) {
            tweetServices.uploadMedia(upload, user, setIncomplete)
                .then(mediaURL => {
                    tweet['mediaURL'] = mediaURL;
                    tweetServices.add(tweet)
                    updateTweets();
                })
        } else {
            try {
                tweetServices.add(tweet);
                updateTweets();

            } catch (error) {
                console.log(error);
            }
        }

        setTweetText("");
        setMedia("");
        setUpload(null);
        setComposePopup(false);
    }
    if (composePopup) {
        return (
            <div className={styles["during-popup"]} onClick={() => { setComposePopup(false) }}>
                {user &&
                    <div className={styles['compose-tweet']} onClick={(e) => { e.stopPropagation() }}>
                        <Link to="" className={styles['exit-btn']} onClick={(e) => {
                            e.preventDefault();
                            setComposePopup(false)
                        }}><i class="fa-solid fa-x"></i></Link>
                        <img
                            src={user.photoURL}
                            alt={""}
                            className={styles['profile-photo']}
                        />
                        <form className={styles['tweet-contents']} onSubmit={onSubmit} >
                            <input
                                type="text"
                                placeholder="What's happening?"
                                className={styles['tweet-text']}
                                value={tweetText}
                                onChange={onTextChange}
                            />
                            <label className={styles['tweet-media-label']} htmlFor='tweet-media'><i className="fa-solid fa-image"></i></label>
                            <input id="tweet-media" type="file" className={styles['tweet-media-input']} onChange={onMediaSelect} value={media} />
                            <input type="submit" value="Tweet" disabled={incomplete} className={styles['tweet-btn']} />
                        </form>
                    </div>
                }
            </div>
        )
    }

}