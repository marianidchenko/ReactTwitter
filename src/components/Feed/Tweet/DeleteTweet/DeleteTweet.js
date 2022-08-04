import { useContext } from "react";
import { TweetContext } from "../../../../contexts/TweetContext";
import { remove } from "../../../../services/tweetServices";
import styles from "./DeleteTweet.module.css";

export const DeleteTweet = ({ alert, setAlert, id}) => {
    const {updateTweets} = useContext(TweetContext)
    const onDelete = () => {
        remove(id);
        updateTweets();
    }
    if (alert) {
        return (
            <div className={styles["alert-container"]}>
                <h1 className={styles["alert-question"]}>Would you really like to delete this post?</h1>
                <button className={styles["alert-btn"]} onClick={onDelete}>Delete</button>
                <button className={styles["alert-btn"]} onClick={() => setAlert(!alert)}>Cancel</button>
            </div>
        )
    }

}