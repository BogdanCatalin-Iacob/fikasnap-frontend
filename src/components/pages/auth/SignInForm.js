import React, { useContext, useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

import styles from "../../../styles/SignInUpForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import appStyles from "../../../App.module.css";
import { SetCurrentUserContext } from "../../../App";

function SignInForm() {
    const setCurrentUser = useContext(SetCurrentUserContext)

    const [signInData, setSignInData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = signInData;

    const history = useHistory();

    const [errors, setErrors] = useState({})

    /** Handle changes in the form's inputs */
    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            // create key/value pair with the field name, and
            // the value entered by the user
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user)
            history.push('/');
        } catch (err) {
            setErrors(err.response?.data);
        }
    }

    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                {/* Sign in form */}
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign in</h1>
                    <Form onSubmit={handleSubmit}>
                        {/* username input */}
                        <Form.Group controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="username"
                                className={styles.Input}
                                value={username}
                                onChange={handleChange} />
                        </Form.Group>

                        {/* errors related to username field */}
                        {errors.username?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}

                        {/* password input */}
                        <Form.Group controlId="password">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                className={styles.Input}
                                value={password}
                                onChange={handleChange} />
                        </Form.Group>
                        {/* errors related to password field */}
                        {errors.password?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}

                        {/* sign in button */}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Sign In
                        </Button>

                        {/* errors not related to username or password fields */}
                        {errors.non_field_errors?.map((message, index) => (
                            <Alert variant="warning" className="mt-3" key={index}>
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>

                {/* link to create an account */}
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signup">
                        Don't have an account? <span>Sign up now!</span>
                    </Link>
                </Container>
            </Col>

            {/* side image for medium / large screens */}
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={"https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero.jpg"}
                />
            </Col>
        </Row>
    );
}

export default SignInForm;