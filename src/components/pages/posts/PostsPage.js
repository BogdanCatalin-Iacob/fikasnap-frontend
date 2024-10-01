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

function PostsPage({ message, filter = "" }) {
    const [posts, setPosts] = useState({ results: [] });

    // loading post will take a moment so keep track of 
    // all data has been fetched or not
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axiosRequest.get(`/posts/?${filter}search=${query}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        // hasLoade to false will display loading spinner
        setHasLoaded(false)

        // wait 1s after the key stroke before making the request to api
        const timer = setTimeout(() => {
            fetchPosts();
        },1000);
        return () => {
            clearTimeout(timer);
        }
    }, [filter, query, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>

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
                        {posts.results.length ?
                            posts.results.map((post) => (
                                <Post key={post.id} {...post} setPosts={setPosts} />
                            )) :
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
        </Row>
    );
}

export default PostsPage;