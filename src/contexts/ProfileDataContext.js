import { createContext, useContext, useState, useEffect } from "react";
import { axiosRequest, axiosResponse } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

// custom hooks
export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

/**
 * ProfileDataProvider is a context provider component that manages and provides
 * profile data to its children components. It initializes the profile data state
 * with default values and updates the popular profiles based on the number of followers
 * using an API request. The component listens for changes in the current user and
 * fetches the updated popular profiles accordingly.
 *
 * @param {Object} children - The component props.
 * @param {ReactNode} children - The child components that will have access to the profile data context.
 * @returns {JSX.Element} A context provider component that supplies profile data and a setter function.
 */
export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({

        // use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] }
    });

    const currentUser = useCurrentUser();

    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosResponse.post('/followers/', {
                followed: clickedProfile.id
            });

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) => {
                        return profile.id === clickedProfile.id
                            ? // This is the profile I clicked on,
                            // update its followers count and set itsfollowing id
                            {
                                ...profile,
                                followers_count: profile.followers_count + 1,
                                following_id: data.id
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
                    })
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) => followHelper(profile, clickedProfile, data.id))
                }
            }))
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnfollow = async (clickedProfile) => {
        try{
            await axiosResponse.delete(`/followers/${clickedProfile.following_id}/`);

            setProfileData((prevState) => ({
                ...prevState,
                pageProfile: {
                    results: prevState.pageProfile.results.map((profile) => 
                        unfollowHelper(profile, clickedProfile))
                },
                popularProfiles: {
                    ...prevState.popularProfiles,
                    results: prevState.popularProfiles.results.map((profile) => 
                        unfollowHelper(profile, clickedProfile))
                }
            }));
        } catch (err) {
            // console.log(err);
        }
    }

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosRequest.get(
                    `/profiles/?ordering=-followers_count`
                );
                setProfileData((prevState) => ({
                    ...prevState,
                    popularProfiles: data
                }));
            } catch (err) {
                // console.log(err);
            }
        }

        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={{ setProfileData, handleFollow, handleUnfollow }}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};