import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosResponse } from "../../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../../contexts/CurrentUserContext";

import btnStyles from "../../../styles/Button.module.css";
import appStyles from "../../../App.module.css";

/**
 * UsernameForm component allows users to change their username.
 * 
 * This component fetches the current user's profile and pre-fills the form
 * with the existing username if the profile ID matches the URL parameter.
 * If the IDs do not match, it redirects the user to the homepage.
 * 
 * The form submission sends a PUT request to update the username and
 * updates the current user context upon success. It also handles and displays
 * any validation errors returned from the server.
 * 
 * @returns {JSX.Element} A form for changing the username with validation feedback.
 */
const UsernameForm = () => {
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const { id } = useParams();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    useEffect(() => {
        if (currentUser?.profile_id?.toString() === id){
            setUsername(currentUser.username);
        } else {
            history.push("/");
        }
    }, [currentUser, history, id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosResponse.put("/dj-rest-auth/user/", {
                username,
            });
            setCurrentUser((prevUser) => ({
                ...prevUser,
                username,
            }));
            history.goBack();
        } catch (err) {
            // console.log(err);
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit} className="my-2">
                        <Form.Group>
                            <Form.Label>Change username</Form.Label>
                            <Form.Control
                                placeholder="username"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        {errors?.username?.map((message, index) => (
                            <Alert key={index} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Blue}`}
                            onClick={() => history.goBack()}
                        >
                            cancel
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Blue}`}
                            type="submit"
                        >
                            save
                        </Button>
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UsernameForm;