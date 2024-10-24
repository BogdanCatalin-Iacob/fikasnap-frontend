import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import appStyles from '../../../App.module.css'
import { axiosRequest } from '../../../api/axiosDefaults';
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import Asset from '../../Assets';

/**
 * Functional component representing a section displaying popular profiles based on followers count.
 * Retrieves and displays a list of popular profiles ordered by followers count.
 * Utilizes internal modules for state management and API requests.
 * @returns {JSX.Element} A container component displaying the most followed profiles.
 */
const PopularProfiles = () => {
    const [profileData, setProfileData] = useState({

        // use the pageProfile later!
        pageProfile: { results: [] },
        popularProfiles: { results: [] }
    });

    const { popularProfiles } = profileData;
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
        <Container className={appStyles.Content}>
            {popularProfiles.results.length ? (
                <>
                    <p>Most followed profiles</p>
                    {popularProfiles.results.map(profile => (
                        <p key={profile.id}>{profile.owner}</p>
                    ))}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;