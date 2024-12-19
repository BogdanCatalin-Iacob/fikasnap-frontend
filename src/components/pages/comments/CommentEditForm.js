import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosResponse } from "../../../api/axiosDefaults";

import styles from "../../../styles/CommentCreateEditForm.module.css";

/**
 * CommentEditForm is a React component that renders a form for editing a comment.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - The ID of the comment to be edited.
 * @param {string} props.content - The current content of the comment.
 * @param {Function} props.setShowEditForm - Function to toggle the visibility of the edit form.
 * @param {Function} props.setComments - Function to update the comments state.
 * 
 * @returns {JSX.Element} A form element with a textarea for editing the comment content,
 * and buttons to cancel or save the changes.
 * 
 * The form uses axios to send a PUT request to update the comment on the server.
 * Upon successful update, it updates the local comments state and hides the edit form.
 */
function CommentEditForm(props) {
    const { id, content, setShowEditForm, setComments } = props;

    const [formContent, setFormContent] = useState(content);

    const handleChange = (event) => {
        setFormContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosResponse.put(`/comments/${id}/`, {
                content: formContent.trim(),
            });
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.map((comment) => {
                    return comment.id === id
                        ? {
                            ...comment,
                            content: formContent.trim(),
                            updated_at: "now",
                        }
                        : comment;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="pr-1">
                <Form.Control
                    className={styles.Form}
                    as="textarea"
                    value={formContent}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            <div className="text-right">
                <button
                    className={styles.Button}
                    onClick={() => setShowEditForm(false)}
                    type="button"
                >
                    cancel
                </button>
                <button
                    className={styles.Button}
                    disabled={!content.trim()}
                    type="submit"
                >
                    save
                </button>
            </div>
        </Form>
    );
}

export default CommentEditForm;