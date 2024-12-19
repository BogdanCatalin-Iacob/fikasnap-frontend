import React from 'react'
import styles from '../../../styles/Profile.module.css'
import btnStyles from '../../../styles/Button.module.css'
import { useCurrentUser } from '../../../contexts/CurrentUserContext';
import { Link } from 'react-router-dom';
import Avatar from '../../Avatar';
import Button from 'react-bootstrap/Button';
import { useSetProfileData } from '../../../contexts/ProfileDataContext';

/**
 * Renders a user profile component with an avatar, username, and follow/unfollow button.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.profile - The profile data of the user.
 * @param {boolean} props.mobile - Flag to determine if the component is in mobile view.
 * @param {number} [props.imageSize=55] - The size of the avatar image.
 * 
 * @returns {JSX.Element} A JSX element representing the user profile.
 * 
 * The component displays the user's avatar and username. If the current user is not the profile owner,
 * it shows a follow or unfollow button based on the following status. The layout adjusts based on the
 * mobile flag.
 */
const Profile = (props) => {
    const { profile, mobile, imageSize = 55 } = props;
    const { id, following_id, image, owner } = profile;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    const { handleFollow, handleUnFollow } = useSetProfileData();

    return (
        <div className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}>
            <div>
                <Link className='align-self-center' to={`/profiles/${id}`}>
                    <Avatar src={image} height={imageSize} />
                </Link>
            </div>
            <div className={`mx-2 ${styles.WrodBreak}`}>
                <strong>{owner}</strong>
            </div>
            <div className={`text-right ${!mobile && 'ml-auto'}`}>
                {/* logged in user won't be able to follow themselves */}
                {!mobile && currentUser && !is_owner(
                    following_id ? (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
                            onClick={() => handleUnFollow(profile)}
                        >
                            unfollow
                        </Button>
                    ) : (
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Black}`}
                            onClick={() => handleFollow(profile)}
                        >
                            follow
                        </Button>
                    )
                )}
            </div>
        </div>
    );
};

export default Profile