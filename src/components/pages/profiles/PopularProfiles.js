import React from 'react'
import Container from 'react-bootstrap/Container'
import appStyles from '../../../App.module.css'
import Asset from '../../Assets';
import Profile from './Profile';
import { useProfileData } from '../../../contexts/ProfileDataContext';

/**
 * Renders a list of popular profiles within a responsive container.
 * 
 * @param {Object} mobile - Component properties.
 * @param {boolean} mobile - Flag indicating if the component is rendered on a mobile device.
 * 
 * @returns {JSX.Element} A container displaying the most followed profiles.
 * If on a mobile device, only the top 4 profiles are shown in a flexbox layout.
 * Otherwise, all profiles are listed with their owner's name.
 * Displays a loading spinner if no profiles are available.
 */
const PopularProfiles = ({ mobile }) => {
    const { popularProfiles } = useProfileData();

    return (
        <Container className={`${appStyles.Content} ${mobile && 'd-lg-none text-center mb-3'}`}>
            {popularProfiles.results.length ? (
                <>
                    <p>Most followed profiles</p>
                    {/* display only 4 profiles on mobile devices */}
                    {mobile ? (
                        <div className='d-flex justify-content-around'>
                            {popularProfiles.results.slice(0, 4).map(profile => (
                                <Profile key={profile.id} profile={profile} mobile />
                            ))}
                        </div>
                    ) : (
                        popularProfiles.results.map(profile => (
                            <p key={profile.id}>{profile.owner}</p>
                        ))
                    )}
                </>
            ) : (
                <Asset spinner />
            )}
        </Container>
    );
};

export default PopularProfiles;