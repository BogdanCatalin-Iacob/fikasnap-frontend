import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";

import styles from "../../../styles/SignInUpForm.module.css";
import btnStyles from "../../../styles/Button.module.css";
import appStyles from "../../../App.module.css";

import { Form, Button, Image, Col, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";

const SignUpForm = () => {
    const [signUpData, setSignUpData] = useState({
        username: '',
        password1: '',
        password2: ''
    });

    const { username, password1, password2 } = signUpData;

    const [errors, setErrors] = useState({})

    const history = useHistory();

    /** Handle changes in the form's inputs */
    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            // create key/value pair with the field name, and
            // the value entered by the user
            [event.target.name]: event.target.value
        });
    };

    /**Handle sign up form submit */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData);
            history.push("/signin");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto py-2 p-md-2" md={6}>

                {/* Sign up form */}
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>sign up</h1>

                    <Form onSubmit={handleSubmit}>
                        {/* Username input */}
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="d-none">Username</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange} />
                        </Form.Group>

                        {/* display errors to user related to username */}
                        {errors.username?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>))}

                        {/* Password input */}
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label className="d-none">Password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange} />
                        </Form.Group>

                        {/* display errors related to password */}
                        {errors.password1?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>))}

                        {/* Password confirmation input */}
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label className="d-none">Confirm password</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="password"
                                placeholder="Confirm password"
                                name="password2"
                                value={password2}
                                onChange={handleChange} />
                        </Form.Group>

                        {/* display errors related to password confirmation */}
                        {errors.password2?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>))}

                        {/* Form Submit button */}
                        <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                            Sign up
                        </Button>

                        {/* display errors non related to input fields */}
                        {errors.non_fields_errors?.map((message, index) => (
                            <Alert variant="warning" className="mt-3" key={index}>
                                {message}
                            </Alert>))}
                    </Form>
                </Container>

                {/* Sign in redirect link */}
                <Container className={`mt-3 ${appStyles.Content}`}>
                    <Link className={styles.Link} to="/signin">
                        Already have an account? <span>Sign in</span>
                    </Link>
                </Container>
            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
            >
                {/* image displayed on large screens */}
                <Image
                    className={`${appStyles.FillerImage}`}
                    src={
                        "https://codeinstitute.s3.amazonaws.com/AdvancedReact/hero2.jpg"
                    }
                />
            </Col>
        </Row>
    );
};

export default SignUpForm;