import React from 'react';
import { Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <TrackVisibility partialVisibility>
        {({ isVisible }) => (
          <div className={isVisible ? "animate__animated animate__rotateInDownRight proj-imgbx" : "proj-imgbx"}>
            <img src={imgUrl} alt={title} />
            <div className="proj-txtx">
              <h4>{title}</h4>
              <span>{description}</span>
            </div>
          </div>
        )}
      </TrackVisibility>
    </Col>
  )
}
