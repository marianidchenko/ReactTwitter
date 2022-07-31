import styles from './LeftSidebar.module.css'
import * as authService from "../../services/authServices"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import { Navigation } from './Navigation'

export const LeftSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <aside className={styles["sidebar-left"]}>
           <Navigation />
            <button className={styles["sidebar-tweet"]}>Tweet</button>
            <button className={styles["sidebar-tweet-compact"]}><i class="fa-solid fa-feather-pointed"></i></button>
            <article className={styles["profile-card"]}>
                <img
                    src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png"
                    alt=""
                    className={styles["profile-photo"]}
                />
                <div className={styles["profile-info"]}>
                    <h3 className={styles["profile-name"]}>Maria Nidchenko</h3>
                    <p className={styles["profile-handle"]}>{user?.email}</p>
                </div>
                <i className="fa-solid fa-ellipsis" />
                <div className={styles["profile-card-menu"]}>
                    <article className={styles["profile-section"]}>
                        <img
                            src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png"
                            alt=""
                            className={styles["profile-photo"]}
                        />
                        <div className={styles["profile-info"]}>
                            <h3 className={styles["profile-name"]}>Maria Nidchenko</h3>
                            <p className={styles["profile-handle"]}>@mnidchenko</p>
                        </div>
                    </article>
                    <button href="" className={styles["logout-btn"]} onClick={authService.logout}>
                        Log out of @mnidchenko
                    </button>
                </div>
            </article>
        </aside>
    )
}
