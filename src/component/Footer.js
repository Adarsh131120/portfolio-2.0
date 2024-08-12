import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
 
import logo from "../assets/logo.svg";
import navIcon1 from "../assets/nav-icon1.svg";
import navIcon2 from "../assets/nav-icon2.svg";
import navIcon3 from "../assets/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
         
          <TrackVisibility>
            {({ isVisible }) => (
              <Col size={12} sm={6} className={isVisible ? 'animate__animated animate__fadeInLeft' : ''}>
                <img src={logo} alt="Logo" />
              </Col>
            )}
          </TrackVisibility>
          <TrackVisibility>
            {({ isVisible }) => (
              <Col size={12} sm={6} className={`text-sm-end ${isVisible ? 'animate__animated animate__fadeInRight' : ''}`}>
                <div className="social-icon">
                  <a href="#"><img src={navIcon1} alt="Icon" /></a>
                  <a href="#"><img src={navIcon2} alt="Icon" /></a>
                  <a href="#"><img src={navIcon3} alt="Icon" /></a>
                </div>
                <p>Copyright 2024. All Rights Reserved</p>
              </Col>
            )}
          </TrackVisibility>
        </Row>
      </Container>
    </footer>
  )
}
