import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import * as tweetServices from '../../services/tweetServices'

import { ComposeTweet } from './ComposeTweet/ComposeTweet';
import styles from './Feed.module.css'
import { Tweet } from './Tweet/Tweet';

export const Feed = () => {
    const { user } = useContext(AuthContext);
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        updateTweets()
    }, [])

    const updateTweets = async () => {
        const data = await tweetServices.getAll();
        setTweets((data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))).sort((a, b) => b.timestamp - a.timestamp))
    }

    const refreshFeed = () => {
        updateTweets()
            .then(window.scrollTo(0, 0)
            )
    }

    return (
        <main className={styles['main-feed']}>
            <header className={styles['home-header']}>
                <h2 className={styles['home-title']} onClick={refreshFeed}>Home</h2>
            </header>
            {user
                ? <ComposeTweet user={user} updateTweets={updateTweets} />
                : ""
            }
            {
                tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        {...tweet}
                        updateTweets={updateTweets}
                    />
                ))}

        </main>
    );
}