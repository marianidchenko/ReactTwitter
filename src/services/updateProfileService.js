import * as profileServices from "../services/profileService"
import * as profilePhotoServices from "../services/profilePhotoServices"
import { updateProfile } from "firebase/auth"

export const updateProfileService = (formData, user, profile, setProfile, setLoading, setEditMode) => {
    const bannerFile = formData.get('banner');
    const photoFile = formData.get('photo');
    const displayName = formData.get('displayName');
    const bio = formData.get('bio');
    if (bannerFile.size > 0) {
        profilePhotoServices.uploadBanner(bannerFile, user, setLoading)
            .then((bannerURL) => {
                profileServices.update(profile.id, { bannerURL })
                setProfile({ ...profile, bannerURL })
                updateProfile(user, {
                    displayName: `${displayName}/${profile.username}`
                })
                profileServices.update(profile.id, { displayName, bio });
                setProfile({ ...profile, displayName, bio })
                setEditMode(false);
            })
    }
    else if (photoFile.size > 0) {
        profilePhotoServices.upload(photoFile, user, setLoading)
            .then((photoURL) => {
                profileServices.update(profile.id, { photoURL })
                setProfile({ ...profile, photoURL })
                updateProfile(user, { photoURL: photoURL })
                updateProfile(user, {
                    displayName: `${displayName}/${profile.username}`
                })
                profileServices.update(profile.id, { displayName, bio });
                setProfile({ ...profile, displayName, bio })
                setEditMode(false);
            })
    }
    if (photoFile.size > 0 && bannerFile.size > 0) {
        profilePhotoServices.uploadBanner(bannerFile, user, setLoading)
            .then((bannerURL) => {
                profileServices.update(profile.id, { bannerURL })
                    .then((photoURL) => {
                        profileServices.update(profile.id, { photoURL, displayName, bio })
                        setProfile({ ...profile, photoURL, bannerURL, displayName, bio })
                        updateProfile(user, { photoURL: photoURL, displayName: `${displayName}/${profile.username}` })
                        setEditMode(false);
                    })
            })
    }
    if (!photoFile.size && !bannerFile.size) {
        updateProfile(user, {
            displayName: `${displayName}/${profile.username}`
        })
        profileServices.update(profile.id, { displayName, bio });
        setProfile({ ...profile, displayName, bio })
        setEditMode(false);
    }
}