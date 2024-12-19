import styles from "../styles/MoreDropdown.module.css"
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fas fa-ellipsis-v"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

/**
 * Renders a customizable dropdown menu with edit and delete options.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.handleEdit - Callback function to handle the edit action.
 * @param {Function} props.handleDelete - Callback function to handle the delete action.
 *
 * @returns {JSX.Element} A dropdown component with edit and delete options.
 */
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu className="text-center" popperConfig={{ strategy: "fixed" }}>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fas fa-edit" />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fas fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

/**
 * Renders a dropdown menu for editing user profile settings.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.id - The ID of the user profile to be edited.
 * 
 * @returns {JSX.Element} A dropdown component with options to change the username and password.
 * 
 * The dropdown is styled with organization-specific CSS and uses a custom toggle component.
 * Clicking on an item navigates to the respective edit page using React Router.
 */
export function ProfileEditDropdown({ id }) {
    const history = useHistory();

    return (
        <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left" >
            <Dropdown.Toggle as={ThreeDots} />
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/username`)}
                    aria-label='edit-username'
                >
                    <i className="far fa-id-card" />
                    change username
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={() => history.push(`/profiles/${id}/edit/password`)}
                    aria-label="edit-password"
                >
                    <i className="fas fa-key" />
                    change password
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}