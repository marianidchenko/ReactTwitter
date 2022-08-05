import styles from "./EditTweet.module.css"
import * as tweetServices from "../../../../services/tweetServices"
import { Fragment, useContext } from "react";
import { AuthContext } from "../../../../contexts/authContext";
export const EditTweet = ({ id, tweetText, mediaURL, setTweetText, setMediaURL, setEdit }) => {
    const { user, replies, setReplies } = useContext(AuthContext);
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newText = formData.get('tweet-text');
        const newMedia = formData.get('tweet-media-input');
        if (newMedia?.size > 0) {
            tweetServices.uploadMedia(newMedia, user, () => { })
                .then(resultURL => {
                    setMediaURL(resultURL);
                    tweetServices.update(id, {
                        "tweetText": newText,
                        "mediaURL": resultURL,
                    });
                })
        } else {
            tweetServices.update(id, {
                "tweetText": newText,
            });
        }
        setTweetText(newText);
        setEdit(false);
    }

    return (
        <form className={styles['edit-form']} onSubmit={onSubmit} >
            <input type="text" className={styles['edit-text']} defaultValue={tweetText} name="tweet-text" />

            {mediaURL &&
                <Fragment>
                    <img
                        src={mediaURL}
                        alt=""
                        className={styles["tweet-media"]}
                    />
                    <label className={styles['tweet-media-label']} htmlFor='tweet-media-input'><i className="fa-solid fa-image"></i></label>
                    <input id="tweet-media-input" type="file" name="tweet-media-input" className={styles['tweet-media-input']} />
                </Fragment>
            }
            <input type="submit" value="update" className={styles['edit-btn']} />
        </form>
    );
}