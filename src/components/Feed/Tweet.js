import { Fragment } from 'react'
import styles from './Tweet.module.css'
export const Tweet = () => {
    return (
        <Fragment>
            <div className={styles["tweet"]}>
                <img src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png" alt="" className={styles["tweet-profile-photo"]} />
                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>Someone</h3>
                    <p className={styles["tweet-username"]}>@someone123</p>
                    <p className={styles['tweet-text']}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
                        aspernatur? Corrupti adipisci ipsa iure, ratione cum dicta dolorum
                        rem, ipsum quis maiores ex.
                    </p>
                </article>
                <div className={styles["interaction-menu"]}>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-message" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-retweet" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-heart" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-arrow-up-from-bracket" />
                    </a>
                </div>
            </div>
            <div className={styles["tweet"]}>
                <img
                    src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png"
                    alt=""
                    className={styles["tweet-profile-photo"]}
                />
                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>Maria Nidchenko</h3>
                    <p className={styles["tweet-username"]}>@marianidchenko</p>
                    <p className={styles['tweet-text']}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
                        aspernatur? Corrupti adipisci ipsa iure, ratione cum dicta dolorum
                        rem, ipsum quis maiores ex.
                    </p>
                    <img
                        src="https://thumbs.dreamstime.com/b/forrest-27720334.jpg"
                        alt=""
                        className={styles["tweet-media"]}
                    />
                </article>
                <div className={styles["interaction-menu"]}>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-message" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-retweet" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-heart" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-arrow-up-from-bracket" />
                    </a>
                </div>
            </div>
            <div className={styles["tweet"]}>
                <img src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png" alt="" className={styles["tweet-profile-photo"]} />
                <article className={styles['tweet-contents']}>
                    <h3 className={styles["tweet-name"]}>Someone</h3>
                    <p className={styles["tweet-username"]}>@someone123</p>
                    <p className={styles['tweet-text']}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
                        aspernatur? Corrupti adipisci ipsa iure, ratione cum dicta dolorum
                        rem, ipsum quis maiores ex.
                    </p>
                </article>
                <div className={styles["interaction-menu"]}>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-message" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-retweet" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-heart" />
                    </a>
                    <a href="" className={styles["interaction-btn"]}>
                        <i className="fa-solid fa-arrow-up-from-bracket" />
                    </a>
                </div>
            </div>
        </Fragment>
    );
}