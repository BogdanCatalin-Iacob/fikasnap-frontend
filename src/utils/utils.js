import { axiosRequest } from "../api/axiosDefaults"

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosRequest.get(resource.next)
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            // 
            results: data.results.reduce((acc, curr) => {
                return acc.some(accResult => accResult.id === curr.id)
                    ? acc
                    : [...acc, curr];
            }, prevResource.results)
        }))
    } catch (err) {

    }
};

export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
        ? // This is the profile I clicked on,
        // update its followers count and set itsfollowing id
        {
            ...profile,
            followers_count: profile.followers_count + 1,
            following_id
        }
        : profile.is_owner
            ? // This is the profile of the logged in user
            // update its following count
            {
                ...profile,
                following_count: profile.following_count + 1
            }
            : // This is noyt the profile the user clicked on or the profile
            // the user owns, so just return it unchanged
            profile;
}

export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
        ? {
            ...profile,
            followers_count: profile.followers_count - 1,
            following_id: null,
        }
        : profile.is_owner
        ? {...profile, following_count: profile.following_count - 1}
        : profile;
}