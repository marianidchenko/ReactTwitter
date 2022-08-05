import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import * as tweetServices from '../../services/tweetServices';
import styles from './TweetDetails.module.css'
import { LeftSidebar } from '../LeftSidebar/LeftSidebar';
import { RightSidebar } from '../RightSidebar/RightSidebar';
import { Tweet } from '../Feed/Tweet/Tweet';
export const TweetDetails = () => {
    const tweetId = useParams().id;
    const [currentTweet, setCurrentTweet] = useState(null);
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        tweetServices.getOne(tweetId)
            .then(snap => {
                const tweet = snap.data();
                tweet.id = snap.id
                setCurrentTweet(tweet);
            });
        tweetServices.getReplies(tweetId)
            .then(snapshot => {
               snapshot.forEach(snap => {replies.push({...snap.data(), "id": snap.id})})
            }
        )
    }, []);

    return (
        <Fragment>
            <LeftSidebar />
            <div className={styles['detail-wrapper']}>
                {currentTweet &&
                    <Tweet tweet={currentTweet} replies={replies} setReplies={setReplies}/>
                }
                <div className={styles['reply-wrapper']}>
                    {replies?.length > 0
                        ? replies.map((reply) => <Tweet tweet={reply} id={reply.id} replies={replies} setReplies={setReplies}/>)
                        : <h2 className={styles['no-replies']}>No replies yet.</h2>
                    }
                </div>
            </div>
            <RightSidebar />
        </Fragment>
    );
}