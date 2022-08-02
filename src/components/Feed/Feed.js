import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/authContext';
import * as tweetServices from '../../services/tweetServices'

import { ComposeTweet } from './ComposeTweet';
import styles from './Feed.module.css'
import { Tweet } from './Tweet';

export const Feed = () => {
    const { user } = useContext(AuthContext);
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        tweetServices.getAll()
            .then(data => {
                setTweets(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
                console.log(tweets)
            })
    }, [])

    return (
        <main className={styles['main-feed']}>
            <header className={styles['home-header']}>
                <h2 className={styles['home-title']}>Home</h2>
            </header>
            {user
                ? <ComposeTweet user={user} />
                : ""
            }
            {console.log(tweets)}
            {tweets.map((tweet) => (
                <Tweet
                    key={tweet.id}
                    {...tweet}
                />
            ))}

        </main>
    );
}