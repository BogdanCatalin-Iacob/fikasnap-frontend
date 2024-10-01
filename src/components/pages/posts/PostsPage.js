import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from '../../../App.module.css';
import appStyles from '../../../styles/PostsPage.module.css'
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosRequest } from "../../../api/axiosDefaults";
import Post from "./Post";

import NoResults from '../../../assets/no-results.png'
import Asset from "../../Assets";

function PostsPage({message, filter = ""}) {
    const [posts, setPosts] = useState({results: []});

    // loading post will take a moment so keep track of 
    // all data has been fetched or not
    const [hasLoaded, setHasLoaded] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await axiosRequest.get(`/posts/?${filter}`)
                setPosts(data)
                setHasLoaded(true)
            } catch (err) {
                console.log(err)
            }
        }
        // hasLoade to false will display loading spinner
        setHasLoaded(false)
        fetchPosts()
    }, [filter, pathname])

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
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
                    <Container className={appStyles.Content}>\
                        <Asset spinner />
                    </Container>
                )}
            </Col>
        </Row>
    );
}

export default PostsPage;