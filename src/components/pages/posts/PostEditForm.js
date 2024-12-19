import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import styles from "../../../styles/PostCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import { Alert, Image } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { axiosRequest } from "../../../api/axiosDefaults";

/**
 * PostEditForm is a React component that provides a form for editing an existing post.
 * It fetches the post data on mount and pre-fills the form fields with the current post details.
 * Users can update the title, content, and image of the post.
 * If the user is not the owner of the post, they are redirected to the home page.
 * The form handles input changes, image uploads, and form submission with error handling.
 * On successful submission, the user is redirected to the updated post's page.
 */
function PostEditForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { title, content, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosRequest.get(`/posts/${id}/`)
                const { title, content, image, is_owner } = data;

                // if the user is not the owner, redirect to home page
                is_owner ? setPostData({ title, content, image }) : history.push('/');
            } catch (err) {
                console.log(err);
            }
        };
        handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            // clear previous chosen image
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                // create url for chosen file
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('content', content);
        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }


        //sending image and text requires to
        //refresh user access token
        try {
            await axiosRequest.put(`/posts/${id}/`, formData);
            history.push(`/posts/${id}`);
        } catch (err) {
            console.log(err);
            // if 401 user will be redirected by axiosRequest interceptor logic
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    }

    const textFields = (
        <div className="text-center">
            {/* post title input */}
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {/* post title errors */}
            {errors?.title?.map((message, index) => (
                <Alert variant="warning" key={index}>
                    {message}
                </Alert>
            ))}

            {/* post content input */}
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>
            {/* post content input errors */}
            {errors?.content?.map((message, index) => (
                <Alert variant="warning" key={index}>
                    {message}
                </Alert>
            ))}

            {/* redirect to the last page */}
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                save
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">

                            <figure>
                                <Image className={appStyles.Image} src={image} rounded />
                            </figure>
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                    htmlFor="image-upload"
                                >
                                    Change the image
                                </Form.Label>
                            </div>

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {/* post image input errors */}
                        {errors?.image?.map((message, index) => (
                            <Alert variant="warning" key={index}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PostEditForm;