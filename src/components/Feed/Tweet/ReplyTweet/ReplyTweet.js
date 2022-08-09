import { useContext, useState } from 'react'
import { AuthContext } from '../../../../contexts/authContext'
import * as tweetServices from "../../../../services/tweetServices"
import styles from './ReplyTweet.module.css'

export const ReplyTweet = ({ id, setReply, replies, setReplies }) => {
    const { user } = useContext(AuthContext);
    const [incomplete, setIncomplete] = useState("");

    const [tweetText, setTweetText] = useState("");
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
        let tweet = {
            tweetText,
            timestamp: new Date().getTime() / 1000,
            ownerId: user.uid,
            isReply: true,
            replyTo: id,
            likedBy: [],
            savedBy: [],
        };
        if (upload) {
            tweetServices.uploadMedia(upload, user, setIncomplete)
                .then(mediaURL => {
                    tweet['mediaURL'] = mediaURL;
                    tweetServices.add(tweet)
                        .then(snap => {
                            if (replies) {
                                setReplies([...replies, tweet])
                            } else {
                                setReplies([tweet])
                            }
                        })
                })
        } else {
            try {
                tweetServices.add(tweet)
                    .then(snap => {
                        if (replies) {
                            setReplies([...replies, tweet])
                        } else {
                            setReplies([tweet])
                        }
                    })


            } catch (error) {
                console.log(error);
            }
        }

        setTweetText("");
        setUpload(null);
        setReply(false);

    }

    return (
        <div className={styles['compose-tweet']}>
            <img
                src={user.photoURL}
                alt={""}
                className={styles['profile-photo']}
            />
            <form className={styles['tweet-contents']} onSubmit={onSubmit} >
                <input
                    type="text"
                    placeholder="Tweet your reply"
                    className={styles['tweet-text']}
                    value={tweetText}
                    onChange={onTextChange}
                />
                <label className={styles['tweet-media-label']} htmlFor='tweet-media'><i className="fa-solid fa-image"></i></label>
                <input id="tweet-media" type="file" className={styles['tweet-media-input']} onChange={onMediaSelect} />
                <input type="submit" value="Reply" disabled={incomplete} className={styles['tweet-btn']} />
            </form>
        </div>
    )
}