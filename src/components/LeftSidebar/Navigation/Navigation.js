import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

export const Navigation = ({ user }) => {
    return (
        <ul className={styles["menu"]}>
            <li className={styles["menu-logo"]}>
                <Link to="/">
                    <i className="fa-brands fa-twitter" />
                </Link>
            </li>
            <li className={styles["menu-items"]}>
                <Link to="/" className={styles["menu-Link"]}>
                    <i className="fa-solid fa-house-chimney-window" />
                    <p>Home</p>
                </Link>
            </li>
            <li className={styles["menu-items"]}>
                <Link to="" className={styles["menu-Link"]}>
                    <i className="fa-solid fa-hashtag" />
                    <p>Explore</p>
                </Link>
            </li>
            {user
                ? <Fragment>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-bell" />
                            <p>Notifications</p>
                        </Link>
                    </li>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-envelope" />
                            <p>Messages</p>
                        </Link>
                    </li>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-bookmark" />
                            <p>Bookmarks</p>
                        </Link>
                    </li>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-file-lines" />
                            <p>Lists</p>
                        </Link>
                    </li>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-user" />
                            <p>Profile</p>
                        </Link>
                    </li>
                    <li className={styles["menu-items"]}>
                        <Link to="" className={styles["menu-Link"]}>
                            <i className="fa-solid fa-circle-chevron-down" />
                            <p>More</p>
                        </Link>
                    </li>
                </Fragment>
                : <li className={styles["menu-items"]}>
                <Link to="/login" className={styles["menu-Link"]}>
                    <i className="fa-solid fa-user" />
                    <p>Sign In</p>
                </Link>
            </li>
            }
        </ul>
    )
}