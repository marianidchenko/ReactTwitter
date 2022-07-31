import styles from './LeftSidebar.module.css'
import * as authService from "../../services/authServices"
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

export const LeftSidebar = () => {
    const { user } = useContext(AuthContext);

    return (
        <aside className={styles["sidebar-left"]}>
            <ul className={styles["menu"]}>
                <li className={styles["menu-logo"]}>
                    <i className="fa-brands fa-twitter" />
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-house-chimney-window" />
                        Home
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-hashtag" />
                        Explore
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-bell" />
                        Notifications
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-envelope" />
                        Messages
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-bookmark" />
                        Bookmarks
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-file-lines" />
                        Lists
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-user" />
                        Profile
                    </a>
                </li>
                <li className={styles["menu-items"]}>
                    <a href="" className={styles["menu-link"]}>
                        <i className="fa-solid fa-circle-chevron-down" />
                        More
                    </a>
                </li>
            </ul>
            <button className={styles["sidebar-tweet"]}>Tweet</button>
            <article className={styles["profile-card"]}>
                <img
                    src="http://forum.uscutter.com/uploads/monthly_2017_09/M.png.cd19cd32020dba58356a4fc070a73ad3.png"
                    alt=""
                    className={styles["profile-photo"]}
                />
                <div className={styles["profile-info"]}>
                    <h3 className={styles["profile-name"]}>Maria Nidchenko</h3>
                    <p className={styles["profile-handle"]}>{user.email}</p>
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
