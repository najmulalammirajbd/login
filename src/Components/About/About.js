import React from 'react';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookSquare, faGooglePlay, faLinkedinIn, faYoutube, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';

const About = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '246px' }}>
            <h1 style={{ color: '#1da0bc' }}>ISLAVO</h1>
            <a style={{ marginTop: '20px', marginLeft: '3px', fontSize: '20px', textDecoration: 'none' }} target="_blank" href="https://www.facebook.com/islavo"><FontAwesomeIcon style={{ color: '#1da0bc' }} icon={faFacebook} /></a>
            <a style={{ marginTop: '20px', marginLeft: '10px', fontSize: '20px', textDecoration: 'none' }} target="_blank" href="https://www.youtube.com/channel/UCp1VjFJm0bK6bBVZ1AfKQdw"><FontAwesomeIcon style={{ color: '#1da0bc' }} icon={faYoutube} /></a>
            <a style={{ marginTop: '20px', marginLeft: '10px', fontSize: '20px', textDecoration: 'none' }} target="_blank" href="https://www.linkedin.com/company/islavo/"><FontAwesomeIcon style={{ color: '#1da0bc' }} icon={faLinkedinIn} /></a>
            <a style={{ marginTop: '20px', marginLeft: '10px', fontSize: '20px', textDecoration: 'none' }} target="_blank" href="https://play.google.com/store/apps/details?id=com.islavo"><FontAwesomeIcon style={{ color: '#1da0bc' }} icon={faGooglePlay} /></a>
        </div>
    );
};

export default About;