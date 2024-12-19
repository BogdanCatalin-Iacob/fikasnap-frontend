import React from "react";
import styles from '../../../styles/Post.module.css'
import { useCurrentUser } from "../../../contexts/CurrentUserContext";
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import { axiosRequest, axiosResponse } from "../../../api/axiosDefaults";
import { MoreDropdown } from "../../MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

/**
 * Renders a Post component displaying post details and interactions.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - The unique identifier of the post.
 * @param {string} props.owner - The username of the post owner.
 * @param {number} props.profile_id - The profile ID of the post owner.
 * @param {string} props.profile_image - The URL of the post owner's profile image.
 * @param {number} props.comments_count - The number of comments on the post.
 * @param {number} props.likes_count - The number of likes on the post.
 * @param {number|null} props.like_id - The ID of the like if the current user has liked the post.
 * @param {string} props.title - The title of the post.
 * @param {string} props.content - The content of the post.
 * @param {string} props.image - The URL of the post image.
 * @param {string} props.updated_at - The last updated timestamp of the post.
 * @param {boolean} props.postPage - Indicates if the component is rendered on a post page.
 * @param {Function} props.setPosts - Function to update the posts state.
 * 
 * @returns {JSX.Element} A React component that displays a post with options to edit, delete, like, and unlike.
 */
const Post = (props) => {

    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`)
    };

    const handleDelete = async () => {
        try {
            await axiosResponse.delete(`/posts/${id}/`)
            history.goBack();
        }catch (err) {
            // console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRequest.post('/likes/', { post: id })
            // update post data
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id ?
                        { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRequest.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) => {
                    return post.id === id ?
                        { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`} >
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own post!</Tooltip>}>
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className="far fa-comments" />
                        {comments_count}
                    </Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Post;