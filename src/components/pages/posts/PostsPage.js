import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from '../../../App.module.css';
import appStyles from '../../../styles/PostsPage.module.css'

function PostsPage() {
    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                <p>List of posts</p>
            </Col>
        </Row>
    );
}

export default PostsPage;