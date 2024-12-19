import React from 'react';
import NoResults from '../assets/no-results.png';
import appStyles from '../styles/NotFound.module.css';
import Asset from './Assets';

const NotFound = () => {
  return (
    <div>
        <Asset src={NoResults} message={"Sorry, the page you're looking for doesn't exist!"} />
    </div>
  )
};

export default NotFound;