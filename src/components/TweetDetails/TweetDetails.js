import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as tweetServices from '../../services/tweetServices';
import styles from './TweetDetails.module.css'
import { LeftSidebar } from '../LeftSidebar/LeftSidebar';
import { RightSidebar } from '../RightSidebar/RightSidebar';
import { Tweet } from '../Feed/Tweet/Tweet';
export const TweetDetails = () => {
    const tweetId = useParams().id;
    const navigate = useNavigate();
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
                const tempReplies = [];
                snapshot.forEach(snap => { tempReplies.push({ ...snap.data(), "id": snap.id }) })
                setReplies(tempReplies);
            }
            )
    }, [tweetId]);

    return (
        <Fragment>
            <LeftSidebar />
            <div className={styles["tweet-detail-page"]}>
                <header className={styles["tweet-header"]}>
                    <Link to="" className={styles["nav-back"]} onClick={() => {navigate(-1)}}>
                        <i className="fa-solid fa-arrow-left" />
                    </Link>
                    <h2 className={styles["tweet-title"]}>Tweet</h2>
                </header>
                <div className={styles['detail-wrapper']}>
                    {currentTweet &&
                        <Tweet tweet={currentTweet} replies={replies} setReplies={setReplies} />
                    }
                    <div className={styles['reply-wrapper']}>
                        {replies
                            ? replies.map((reply) => <Tweet tweet={reply} key={reply.id} replies={replies} setReplies={setReplies} />)
                            : <h2 className={styles['no-replies']}>No replies yet.</h2>
                        }
                    </div>
                </div>
            </div>

            <RightSidebar />
        </Fragment>
    );
}