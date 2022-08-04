import styles from "./EditTweet.module.css"
import * as tweetServices from "../../../../services/tweetServices"
export const EditTweet = ({ id, tweetText, setTweetText, setEdit }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newText = formData.get('tweet-text');
        setTweetText(newText);
        tweetServices.update(id, {"tweetText": newText})
        setEdit(false);
    }

    return (
        <form className={styles['edit-form']} onSubmit={onSubmit} >
            <input type="text" className={styles['edit-text']} defaultValue={tweetText} name="tweet-text" />
            <input type="submit" value="update" className={styles['edit-btn']} />
        </form>
    );
}