import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { TweetContext } from '../../contexts/TweetContext';
import { ComposeTweet } from './Tweet/ComposeTweet/ComposeTweet';
import styles from './Feed.module.css'
import { Tweet } from './Tweet/Tweet';

export const Feed = () => {
    const { user } = useContext(AuthContext);
    const { updateTweets, tweets, setTweets } = useContext(TweetContext)

    useEffect(() => {
        updateTweets()
    }, [])


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
                ? <ComposeTweet user={user} />
                : ""
            }
            {
                tweets.map((tweet) => (
                    <Tweet
                        key={tweet.id}
                        tweet={tweet}
                        updateTweets={updateTweets}
                    />
                ))}

        </main>
    );
}