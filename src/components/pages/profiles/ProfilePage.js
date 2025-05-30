import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../Assets"

import styles from "../../../styles/ProfilePage.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";

import NoResults from "../../../assets/no-results.png"

import PopularProfiles from "./PopularProfiles";
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosRequest } from "../../../api/axiosDefaults";
import { useProfileData, useSetProfileData } from "../../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "../posts/Post";
import { fetchMoreData } from "../../../utils/utils";
import { ProfileEditDropdown } from "../../MoreDropdown";

/**
 * ProfilePage component displays a user's profile information and their posts.
 * 
 * It fetches and displays the profile details and posts of a user based on the
 * profile ID from the URL parameters. The component uses various hooks to manage
 * state and side effects, including fetching data from the server and updating
 * the UI accordingly. It also includes functionality for following/unfollowing
 * the profile owner and displays a list of popular profiles.
 * 
 * @returns {JSX.Element} A React component that renders the profile page layout.
 */
function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [profilePosts, setProfilePosts] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const { id } = useParams();
    const { setProfileData, handleFollow, handleUnFollow } = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;
    const is_owner = currentUser?.username === profile?.owner;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }, { data: profilePosts }] = await Promise.all([
                    axiosRequest.get(`/profiles/${id}/`),
                    axiosRequest.get(`/posts/?owner__profile=${id}`)
                ])
                setProfileData(prevState => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] }
                }))

                setProfilePosts(profilePosts);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err)
            }
        }
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image className={styles.ProfileImage}
                        roundedCircle src={profile?.image} />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                    <Row className="justify-content-center no-gutters">
                        {/* display number of posts */}
                        <Col xs={3} className="my-2">
                            <div>{profile?.posts_count} &nbsp;
                                <span>
                                    {profile?.posts_count === 1 ? 'post' : 'posts'}
                                </span>
                            </div>
                        </Col>
                        {/* display number of followers */}
                        <Col xs={3} className="my-2">
                            <div>{profile?.followers_count} &nbsp;
                                <span>
                                    {profile?.followers_count === 1 ? 'follower' : 'followers'}
                                </span>
                            </div>
                        </Col>
                        {/* display number of followed accounts */}
                        <Col xs={3} className="my-2">
                            <div>{profile?.following_count} &nbsp;<span>following</span></div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={3} className="text-lg-right">
                    {currentUser &&
                        !is_owner &&
                        (profile?.following_id ? (
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
                        ))}
                </Col>
                {profile?.content && (<Col className="p-3">{profile.content}</Col>)}
            </Row>
        </>
    );

    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">{profile?.owner}'s posts</p>
            <hr />
            {profilePosts.results.length ? (
                <InfiniteScroll
                    children={profilePosts.results.map((post) => (
                        <Post key={post.id} {...post} setPost={setProfilePosts} />
                    ))}
                    dataLength={profilePosts.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!profilePosts.results.next}
                    next={() => fetchMoreData(profilePosts, setProfilePosts)}
                />
            ) : (
                <Asset
                    src={NoResults}
                    message={`No results found, ${profile?.owner} hasn't posted yet.`}
                />
            )}
        </>
    );

    return (
        <>
            <Row>
                <Col>
                    {/* placeholder for cover photo */}
                    <div style={{backgroundColor: "green", width: "100%", height: "300px"}}></div>
                </Col>
            </Row>
            <Row>
                <Col className="py-2 p-0 p-lg-2" lg={12}>
                    {/* <PopularProfiles mobile /> */}
                    <Container className={appStyles.Content}>
                        {hasLoaded ? (
                            <>
                                {mainProfile}
                                {mainProfilePosts}
                            </>
                        ) : (
                            <Asset spinner />
                        )}
                    </Container>
                </Col>
                {/* <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                    <PopularProfiles />
                </Col> */}
            </Row>
        </>
    );
}

export default ProfilePage;