import { Fragment, useContext, useEffect, useState } from "react"
import styles from "./ProfileCard.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";
import * as profileServices from "../../../services/profileService"


export const ProfileCard = ({ profile, tweetCount }) => {
    const { user } = useContext(AuthContext)
    const re = /[A-Za-z]{3} \d{4}/
    const creationTime = (re.exec(profile.creationTime))[0];
    const [follow, setFollow] = useState();
    const [followingNumber, setFollowingNumber] = useState();
    const [followerNumber, setFollowerNumber] = useState();


    useEffect(() => {
        setFollow(profile.followedBy.includes(user?.uid))
        setFollowerNumber(profile.followedBy.length)
        profileServices.getFollowing(profile.uid)
            .then(res => setFollowingNumber(res.size))
    }, [user])

    const onToggleFollow = () => {
        console.log([...profile.followedBy, user.uid])
        if (!follow) {
            profileServices.update(profile.id, { followedBy: [...profile.followedBy, user.uid] })
            setFollowerNumber(followerNumber + 1)
        }
        else {
            profileServices.update(profile.id, { followedBy: profile.followedBy.filter(x => x !== user.uid) })
            setFollowerNumber(followerNumber - 1)
        }
        setFollow(!follow);
    }

    return (
        <Fragment>
            <header className={styles["profile-header"]}>
                <Link to="/" className={styles["nav-back"]}>
                    <i className="fa-solid fa-arrow-left" />
                </Link>
                <div className={styles["profile-info"]}>
                    <h2 className={styles["profile-title"]}>{profile.displayName}</h2>
                    <p className={styles["tweet-count"]}>{tweetCount} Tweets</p>
                </div>
            </header>
            <div className={styles["profile-card"]}>
                <img
                    src="https://www.welovesolo.com/wp-content/uploads/2014/10/p18m34024butbj101mkq1pnjqr75-details.jpg"
                    alt=""
                    className={styles["banner"]}
                />
                <article className={styles["profile-details"]}>
                    <img
                        src={profile.photoURL}
                        alt=""
                        className={styles["profile-photo"]}
                    />
                    {profile.username == user?.displayName.split("/")[1]
                        ? <button className={styles["edit-profile-btn"]}>Edit profile</button>
                        : <button className={styles["edit-profile-btn"]} onClick={onToggleFollow} disabled={!user}>
                            {follow
                                ? "Unfollow"
                                : "Follow"
                            }
                        </button>
                    }

                    <h1 className={styles["profile-name"]}>{profile.displayName}</h1>
                    <p className={styles["profile-username"]}>@{profile.username}</p>
                    <p className={styles["profile-joined-date"]}>
                        <i className="fa-solid fa-calendar-days" />
                        Created {creationTime}
                    </p>
                    <div className={styles["followers"]}>
                        <p className={styles["followers-info"]}>
                            <b className={styles["follower-count"]}>{followingNumber}</b> Following
                        </p>
                        <p className={styles["followers-info"]}>
                            <b className={styles["follower-count"]}>{followerNumber}</b> Followers
                        </p>
                    </div>
                </article>
            </div>
        </Fragment>
    )
}