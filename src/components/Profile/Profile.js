import { Fragment, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { LeftSidebar } from "../LeftSidebar/LeftSidebar";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import * as profileService from "../../services/profileService"
import * as tweetServices from "../../services/tweetServices"
import { useParams } from "react-router-dom";
import { ProfileNav } from "./ProfileNav/ProfileNav";
import styles from "./Profile.module.css"

export const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState();
    const [tweets, setTweets] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        profileService.getByUsername(username)
            .then(snapshot => {
                setProfile(snapshot.docs[0].data())
            })
    }, [])

    useEffect(() => {
        if (profile) {
            tweetServices.getByOwner(profile.uid)
                .then(response => {
                    const tweetArray = []
                    for (const doc of response.docs) {
                        tweetArray.push(doc.data())
                    }
                    setTweets(tweetArray)
                })
        }
    }, [profile])

    return (
        <Fragment>
            <LeftSidebar />
            {profile && tweets &&
                <div className={styles['profile-page']}>
                    <ProfileCard profile={profile} tweetCount={tweets.length} />
                    <ProfileNav tweets={tweets} />
                </div>
            }
            <RightSidebar />
        </Fragment>
    )
}