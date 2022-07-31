import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import styles from './Feed.module.css'
import { Tweet } from './Tweet';

export const Feed = () => {
    const { user } = useContext(AuthContext);

    return (
        <main className={styles['main-feed']}>
            <header className={styles['home-header']}>
                <h2 className={styles['home-title']}>Home</h2>
            </header>
            {user
                ? <div className={styles['compose-tweet']}>
                    <img
                        src={user.photoURL}
                        alt=""
                        className={styles['profile-photo']}
                    />
                    <form action="" className={styles['tweet-contents']}>
                        <input
                            type="text"
                            placeholder="What's happening?"
                            className={styles['tweet-text']}
                        />
                        <button type="submit" className={styles['tweet-btn']}>
                            Tweet
                        </button>
                    </form>
                </div>
                : ""
        }

            <Tweet />
        </main>
    );
}