import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from '../../../styles/PostsPage.module.css'
import appStyles from '../../../App.module.css'
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosRequest } from "../../../api/axiosDefaults";
import Post from "./Post";

import NoResults from '../../../assets/no-results.png'
import Asset from "../../Assets";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../../utils/utils";
import PopularProfiles from "../profiles/PopularProfiles";

import { useCurrentUser } from "../../../contexts/CurrentUserContext";

/**
 * Renders the PostsPage component, which displays a list of posts with search functionality.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to display when no results are found.
 * @param {string} [props.filter=""] - The filter query to apply when fetching posts.
 * 
 * @returns {JSX.Element} The rendered component.
 * 
 * The component uses the `useState` hook to manage the state of posts, loading status, and search query.
 * It utilizes `useEffect` to fetch posts from the API based on the search query and filter, with a debounce
 * effect to delay the API request by 1 second after the user stops typing. The component also includes
 * infinite scrolling to load more posts as the user scrolls down.
 */
function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });

    const currentUser = useCurrentUser();

    // loading post will take a moment so keep track of 
    // all data has been fetched or not
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    // search bar state
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosRequest.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                // console.log(err)
            }
        }
        // hasLoade to false will display loading spinner
        setHasLoaded(false)

        // wait 1s after the key stroke before making the request to api
        const timer = setTimeout(() => {
            fetchPosts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <PopularProfiles mobile />

                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search posts"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </Form>

                {hasLoaded ? (
                    <>
                        {posts.results.length ? (
                            <InfiniteScroll
                                children={
                                    posts.results.map((post) => (
                                        <Post key={post.id} {...post} setPosts={setPosts} />
                                    ))
                                }
                                dataLength={posts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!posts.next}
                                next={() => fetchMoreData(posts, setPosts)}
                            />
                        ) :
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        }
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <PopularProfiles />
            </Col>
        </Row>
    );
}

export default PostsPage;