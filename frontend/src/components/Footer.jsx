import React from 'react';
import LogoIconInverted from '../assets/logos/logo-icon-inverted.png';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'


export default function Footer() {
    return (
        <footer id="footer-section">
            <Container className="d-flex flex-column flex-sm-row justify-content-between align-items-center py-4">
                <div className="d-flex justify-content-start-sm justify-content-center align-items-center my-4-sm pb-1 pb-sm-0">
                    {/* logo */}
                    <Image
                        src={LogoIconInverted}
                        className="d-block mx-auto img-fluid footer-logo"
                        width="50px"
                        loading="lazy"
                    />

                    {/* copyright text */}
                    <p className="footer-text">&copy; 2023 Impact Tutoring. All rights reserved.</p>
                </div>
                
                {/* socials */}
                <ul className="list-unstyled d-flex justify-content-end align-items-center social-icon-list">
                    <li>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} className="social-icon" /></a>
                        <a href="#"><FontAwesomeIcon icon={faDiscord} className="social-icon" /></a>
                        <a href="#"><FontAwesomeIcon icon={faEnvelope} className="social-icon" /></a>
                    </li>
                </ul>     
            </Container>
        </footer>
    )
}
