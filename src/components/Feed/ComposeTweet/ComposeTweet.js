import { useState } from 'react'
import * as tweetServices from "../../../services/tweetServices"
import styles from './ComposeTweet.module.css'

export const ComposeTweet = ({ user, updateTweets }) => {
    const [displayName, username] = user.displayName.split('/');
    const [tweetText, setTweetText] = useState("");
    const [loading, setLoading] = useState("");
    const [media, setMedia] = useState("");
    const [upload, setUpload] = useState(null);

    const onTextChange = (e) => {
        setTweetText(e.target.value)
    }

    const onMediaSelect = (e) => {
        if (e.target.files[0] && user) {
            setUpload(e.target.files[0])
        }
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        let tweet;
        tweetServices.uploadMedia(upload, user, setLoading)
            .then(mediaURL => {
                tweet = {
                    mediaURL,
                    displayName,
                    username,
                    "photoURL": user.photoURL,
                    tweetText,
                    timestamp: new Date().getTime()/1000,
                    ownerId: user.uid
                }
                try {
                    tweetServices.add(tweet)
                    updateTweets();
                    
                } catch (error) {
                    console.log(error);
                }
            })
        setTweetText("");
        setMedia("");
        setUpload(null);
    }

    return (
        <div className={styles['compose-tweet']}>
            <img
                src={user.photoURL}
                alt={""}
                className={styles['profile-photo']}
            />
            <form className={styles['tweet-contents']} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's happening?"
                    className={styles['tweet-text']}
                    value={tweetText}
                    onChange={onTextChange}
                />
                <label className={styles['tweet-media-label']} htmlFor='tweet-media'><i className="fa-solid fa-image"></i></label>
                <input id="tweet-media" type="file" className={styles['tweet-media']} onChange={onMediaSelect} value={media}/>
                <input type="submit" value="Tweet" disabled={loading} className={styles['tweet-btn']} />
            </form>
        </div>
    )
}