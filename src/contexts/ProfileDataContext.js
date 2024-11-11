import { createContext, useContext, useState, useEffect } from "react";
import { axiosRequest } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

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
                console.log(err);
            }
        }

        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};