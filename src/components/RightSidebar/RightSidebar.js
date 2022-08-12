import styles from "./RightSidebar.module.css"
import * as profileServices from "../../services/profileService"
import {useNavigate} from "react-router-dom"

export const RightSidebar = () => {
    const navigate = useNavigate();
    const onSearch = (e) => {
        if (e.key !== "Enter") {
            return
        }
        e.preventDefault();
        const searchQuery = document.getElementById("search-bar").value;
        profileServices.getBySearch(searchQuery)
        .then(snap => {
            if (snap.size > 0) {
                navigate(`/profile/${searchQuery}`)
            }
        })
    }
    return (
        <aside className={styles["sidebar-right"]}>
            <from className={styles["search"]}>
                <input type="text" placeholder="Search Twitter" className={styles["search-bar"]} id="search-bar"/>
                <button type="submit" className={styles["search-btn"]} onClick={onSearch}>
                    <i className="fa-solid fa-magnifying-glass" />
                </button>
            </from>
            <section className={styles["sidebar-section"]}>
                <div className={styles["trends"]}>
                    <h2 className={styles["trends-title"]}>Trends for you</h2>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>#SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                    <article className={styles["trend-card"]}>
                        <p className={styles["trend-info"]}>Trending in Bulgaria</p>
                        <h3 className={styles["trend-hashtag"]}>SQUID</h3>
                        <p className={styles["trend-info"]}>2,005 Tweets</p>
                    </article>
                </div>
                <button className={styles["show-more-btn"]}>Show more</button>
            </section>
            <section className={styles["sidebar-section"]}>
                <div className={styles["follow-suggestions"]}>
                    <h2 className={styles["follow-title"]} />
                    <article className={styles["profile-card"]}>
                        <img src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/alone-Best-Dp-Profile-Images-For-Instagram-photo.gif" alt="" className={styles["profile-photo"]} />
                        <div className={styles["profile-info"]}>
                            <h3 className={styles["profile-name"]}>Someone Important</h3>
                            <p className={styles["profile-handle"]}>@mnidchenko</p>
                        </div>
                    </article>
                    <article className={styles["profile-card"]}>
                        <img src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/alone-Best-Dp-Profile-Images-For-Instagram-photo.gif" alt="" className={styles["profile-photo"]} />
                        <div className={styles["profile-info"]}>
                            <h3 className={styles["profile-name"]}>Someone Important</h3>
                            <p className={styles["profile-handle"]}>@exampleusername</p>
                        </div>
                    </article>
                </div>
                <button className={styles["show-more-btn"]}>Show more</button>
            </section>
        </aside>

    )
}