import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../../components/Avatar";
import { axiosResponse } from "../../../api/axiosDefaults";

/**
 * Renders a form for creating a new comment on a post.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.post - The post object to which the comment is related.
 * @param {Function} props.setPost - Function to update the post state.
 * @param {Function} props.setComments - Function to update the comments state.
 * @param {string} props.profileImage - URL of the profile image of the user.
 * @param {number} props.profile_id - ID of the user's profile.
 * 
 * @returns {JSX.Element} A form component with a textarea for comment input and a submit button.
 * 
 * The form allows users to input and submit comments. Upon submission, it sends a POST request
 * to create a new comment, updates the comments list, and increments the comment count of the post.
 */
function CommentCreateForm(props) {
    const { post, setPost, setComments, profileImage, profile_id } = props;
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosResponse.post("/comments/", {
                content,
                post,
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: [data, ...prevComments.results],
            }));
            setPost((prevPost) => ({
                results: [
                    {
                        ...prevPost.results[0],
                        comments_count: prevPost.results[0].comments_count + 1,
                    },
                ],
            }));
            setContent("");
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profileImage} />
                    </Link>
                    <Form.Control
                        className={styles.Form}
                        placeholder="my comment..."
                        as="textarea"
                        value={content}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                post
            </button>
        </Form>
    );
}

export default CommentCreateForm;