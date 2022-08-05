import styles from './LeftSidebar.module.css'

import { Fragment, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Navigation } from './Navigation/Navigation'
import { UserSection } from './UserSection/UserSection'
import { TweetContext } from '../../contexts/TweetContext'

export const LeftSidebar = () => {
    const { user } = useContext(AuthContext);
    const { setComposePopup } = useContext(TweetContext)
    return (
        <aside className={styles["sidebar-left"]}>
            <Navigation user={user} />

            {user?.accessToken
                ? <Fragment>
                    <button className={styles["sidebar-tweet"]} onClick={() => setComposePopup(true)}>Tweet</button>
                    <button className={styles["sidebar-tweet-compact"]}><i className="fa-solid fa-feather-pointed" onClick={() => setComposePopup(true)}></i></button>
                    <UserSection user={user} />
                </Fragment>
                : ""
            }
        </aside>
    )
}
