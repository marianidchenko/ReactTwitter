import { Fragment, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { LeftSidebar } from "../LeftSidebar/LeftSidebar";
import { RightSidebar } from "../RightSidebar/RightSidebar";
import { ProfileCard } from "./ProfileCard/ProfileCard";
import * as profileService from "../../services/profileService"
import { useParams } from "react-router-dom";

export const Profile = () => {
    const { username } = useParams();
    const [profile, setProfile] = useState();
    useEffect(() => {
        profileService.getByUsername(username)
            .then(snapshot => {
                setProfile(snapshot.docs[0].data())
            }, [username])
    })

    return (
        <Fragment>
            <LeftSidebar />
            {profile && <ProfileCard profile={profile} />}
            <RightSidebar />
        </Fragment>
    )
}