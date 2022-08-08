import { Fragment, useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/authContext"
import * as tweetServices from "../../services/tweetServices"
import { Tweet } from "../Feed/Tweet/Tweet"
import { LeftSidebar } from "../LeftSidebar/LeftSidebar"
import { RightSidebar } from "../RightSidebar/RightSidebar"
import styles from "./Bookmarks.module.css"
import { ComposeTweet } from "../Feed/Tweet/ComposeTweet/ComposeTweet"
import { Link } from "react-router-dom"

export const Bookmarks = () => {
    const { user } = useContext(AuthContext);
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        if (user) {
            tweetServices.getSaves(user.uid)
                .then(snapshot => {
                    const savedArray = []
                    snapshot.docs.map(x => savedArray.push({ ...x.data(), id: x.id }))
                    setTweets(savedArray)
                })

        }
    }, [user])

    return (
        <Fragment>
            <LeftSidebar />
            <main className={styles['bookmark-feed']}>
                <header className={styles["bookmark-header"]}>
                    <Link to="/" className={styles["nav-back"]}>
                        <i className="fa-solid fa-arrow-left" />
                    </Link>
                    <h2 className={styles["bookmark-title"]}>Bookmarks</h2>
                </header>
                {
                    tweets.map((tweet) => (
                        <Tweet
                            key={tweet.id}
                            tweet={tweet}
                        />
                    ))}
            </main>
            <RightSidebar />
        </Fragment>
    )
}