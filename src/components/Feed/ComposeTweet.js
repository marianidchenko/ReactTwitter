import { useState } from 'react'
import * as tweetServices from '../../services/tweetServices'
import styles from './ComposeTweet.module.css'

export const ComposeTweet = ({ user }) => {
    const [displayName, username] = user.displayName.split('/');
    const [tweetText, setTweetText] = useState("")
    const onTextChange = (e) => {
        setTweetText(e.target.value)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const tweet = {
            displayName,
            username,
            "photoURL": user.photoURL,
            tweetText,
        };

        try {
            await tweetServices.add(tweet);
        } catch (error) {
            console.log(error);
        }

        setTweetText("");
    }

    return (
        <div className={styles['compose-tweet']}>
            <img
                src={user.photoURL}
                alt=""
                className={styles['profile-photo']}
            />
            <form action="POST" className={styles['tweet-contents']} onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="What's happening?"
                    className={styles['tweet-text']}
                    value={tweetText}
                    onChange={onTextChange}
                />
                <button type="submit" className={styles['tweet-btn']}>
                    Tweet
                </button>
            </form>
        </div>
    )
}