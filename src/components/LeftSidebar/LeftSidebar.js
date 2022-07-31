import styles from './LeftSidebar.module.css'

import { Fragment, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Navigation } from './Navigation/Navigation'
import { UserSection } from './UserSection/UserSection'

export const LeftSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <aside className={styles["sidebar-left"]}>
            <Navigation user={user} />

            {user?.accessToken
                ? <Fragment>
                    <button className={styles["sidebar-tweet"]}>Tweet</button>
                    <button className={styles["sidebar-tweet-compact"]}><i className="fa-solid fa-feather-pointed"></i></button>
                    <UserSection user={user} />
                </Fragment>
                : ""
            }
        </aside>
    )
}
