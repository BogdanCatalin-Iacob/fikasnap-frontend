import React from 'react';
import NoResults from '../assets/no-results.png';
import appStyles from '../styles/NotFound.module.css';
import Asset from './Assets';

/**
 * NotFound component renders a message indicating that the requested page does not exist.
 * It displays an image and a message using the Asset component.
 *
 * @returns {JSX.Element} A div containing the Asset component with a no-results image and a message.
 */
const NotFound = () => {
  return (
    <div className={appStyles.mt}>
        <Asset src={NoResults} message={"Sorry, the page you're looking for doesn't exist!"} />
    </div>
  )
};

export default NotFound;