import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Upload from "../../../assets/upload_icon.png";

import styles from "../../../styles/PostCreateEditForm.module.css";
import appStyles from "../../../App.module.css";
import btnStyles from "../../../styles/Button.module.css";
import Asset from "../../Assets";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";
import { axiosRequest } from "../../../api/axiosDefaults";

function PostCreateForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { title, content, image } = postData;

    const imageInput = useRef(null);
    const history = useHistory();

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
        formData.append('content', content)
        formData.append('image', imageInput.current.files[0])

        // refresh user access token
        try {
            const { data } = await axiosRequest.post('/posts/', formData);
            history.push(`/posts/${data.id}`);
        } catch (err){
            console.log(err);
            // if 401 user will be redirected by axiosRequest interceptor logic
            if(err.response?.status !== 401) {
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

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => { }}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                create
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
                            {/* show preview of chosen image */}
                            {image ? (
                                <>
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
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}

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

export default PostCreateForm;