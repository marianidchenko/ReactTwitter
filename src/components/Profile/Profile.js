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
import { ProfileContext } from "../../contexts/ProfileContext";
import { ProfileEdit } from "./ProfileEdit/ProfileEdit";

export const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState();
    const [tweets, setTweets] = useState(null);
    const [likes, setLikes] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        profileService.getByUsername(username)
            .then(snapshot => {
                setProfile({ ...snapshot.docs[0].data(), "id": snapshot.docs[0].id })
            })

    }, [username])

    useEffect(() => {
        if (profile) {
            tweetServices.getByOwner(profile.uid)
                .then(response => {
                    const tweetArray = []
                    for (const doc of response.docs) {
                        const tweetInfo = doc.data();
                        tweetInfo['id'] = doc.id;
                        tweetArray.push(tweetInfo)
                    }
                    setTweets(tweetArray)
                })
        }
        if (profile) {
            tweetServices.getLikes(profile.uid)
                .then(snapshot => {
                    const likesArray = []
                    snapshot.docs.map(x => likesArray.push({ ...x.data(), id: x.id }))
                    setLikes(likesArray)
                })
        }
    }, [profile])

    return (
        <Fragment>
            <ProfileContext.Provider value={{ profile, setProfile, editMode, setEditMode }}>
                <LeftSidebar />
                {profile && tweets && !editMode &&
                    <div className={styles['profile-page']}>
                        <ProfileCard tweetCount={tweets.length} />
                        {
                            user && <ProfileNav tweets={tweets} profileLikes={likes} />
                        }

                    </div>
                }
                {profile && editMode &&
                    <ProfileEdit />
                }

                <RightSidebar />
            </ProfileContext.Provider>
        </Fragment>
    )
}