import { useContext } from "react";
import { TweetContext } from "../../../../contexts/TweetContext";
import { remove } from "../../../../services/tweetServices";
import { useNavigate } from 'react-router-dom';
import styles from "./DeleteTweet.module.css";

export const DeleteTweet = ({ alert, setAlert, id, replies, setReplies }) => {
    const navigate = useNavigate();
    const { updateTweets } = useContext(TweetContext)
    const onDelete = () => {
        remove(id)
            .then(snap => {
                updateTweets();
                if (replies) {
                    setReplies(replies.filter(r => r.id !== id))
                }
            })
        if (window.location.href.includes(id)) {
            navigate('/')
        }
        setAlert(!alert);
    }
    if (alert) {
        return (
            <div className={styles["alert-container"]}>
                <h1 className={styles["alert-question"]}>Are you suure you want to delete this post?</h1>
                <button className={styles["alert-btn", "delete-btn"]} onClick={onDelete}>Delete</button>
                <button className={styles["alert-btn"]} onClick={() => setAlert(!alert)}>Cancel</button>
            </div>
        )
    }

}