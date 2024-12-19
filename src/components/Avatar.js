import React from 'react'
import styles from '../styles/Avatar.module.css'

/**
 * Avatar component that displays an image and optional text.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.src - The source URL of the avatar image.
 * @param {number} [props.height=45] - The height and width of the avatar image in pixels.
 * @param {string} [props.text] - Optional text to display alongside the avatar image.
 * @returns {JSX.Element} A span element containing an image and optional text.
 */
const Avatar = ({ src, height = 45, text }) => {
    return (
        <span>
            <img
                className={styles.Avatar}
                src={src}
                height={height}
                width={height}
                alt='avatar'
            />
            {text}
        </span>
    )
}

export default Avatar