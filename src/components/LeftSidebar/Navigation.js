import styles from './Navigation.module.css'

export const Navigation = () => {
    return (
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
    )
}