import { jwtDecode } from "jwt-decode";
import { axiosRequest } from "../api/axiosDefaults"

/**
 * Fetches additional data from a paginated resource and updates the state.
 *
 * @param {Object} resource - The current resource object containing pagination info.
 * @param {Function} setResource - Function to update the resource state.
 *
 * This function makes an HTTP GET request to the 'next' URL of the resource
 * to retrieve more data. It updates the resource state by appending new results
 * while ensuring no duplicate entries based on the 'id' property.
 * In case of an error during the request, it is silently caught.
 */
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

/**
 * Updates the profile object based on the clicked profile and following status.
 *
 * @param {Object} profile - The profile object to be updated.
 * @param {Object} clickedProfile - The profile object that was clicked on.
 * @param {number} following_id - The ID representing the following relationship.
 * @returns {Object} - The updated profile object with modified followers or following count.
 *
 * If the profile is the one clicked on, increment its followers count and set its following ID.
 * If the profile belongs to the logged-in user, increment its following count.
 * Otherwise, return the profile unchanged.
 */
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

/**
 * Adjusts the follower and following counts for a profile when unfollowing.
 *
 * @param {Object} profile - The profile of the user performing the unfollow action.
 * @param {Object} clickedProfile - The profile of the user being unfollowed.
 * @returns {Object} - The updated profile object with adjusted follower or following counts.
 */
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
};

/**
 * Sets the timestamp of the refresh token in local storage.
 *
 * Decodes the expiration time from the provided refresh token data
 * and stores it in the local storage under the key "refreshTokenTimestamp".
 *
 * @param {Object} data - The data object containing the refresh token.
 */
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp)
}

/**
 * Determines if the token should be refreshed by checking the presence
 * of a 'refreshTokenTimestamp' in localStorage.
 *
 * @returns {boolean} True if 'refreshTokenTimestamp' exists in localStorage, false otherwise.
 */
export const shouldRefreshToken = () => {
    return !!localStorage.getItem('refreshTokenTimestamp')
}

/**
 * Removes the 'refreshTokenTimestamp' item from localStorage.
 * This function is used to clear the stored timestamp of the refresh token.
 */
export const removeTokenTimestamp = () => {
    localStorage.removeItem('refreshTokenTimestamp')
}