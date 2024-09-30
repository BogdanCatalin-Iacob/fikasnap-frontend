import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import appStyles from '../../../App.module.css';
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosRequest } from "../../../api/axiosDefaults";
import Post from "./Post";

function PostPage() {
    // fetch the param set in the Route
    const { id } = useParams();

    // single post returns an object
    // multiple post returns array of objects
    const [post, setPost] = useState({results: []})

    useEffect(() => {
        const handleMount = async () => {
            try {
                // destructure data from the request and rename it to post
                const [{data: post}] = await Promise.all([
                    axiosRequest.get(`/posts/${id}`),
                ])
                setPost({results: [post]})
                console.log(post)
            } catch(err) {
                console.log(err)
            }
        };

        // run every time when post id changes
        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles for mobile</p>
                {/* pass post details */}
                <Post {...post.results[0]} setPosts={setPost} postPage />
                <Container className={appStyles.Content}>
                    Comments
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Popular profiles for desktop
            </Col>
        </Row>
    );
}

export default PostPage;