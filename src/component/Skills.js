import React, { useRef, useEffect } from 'react';
import meter1 from "../assets/meter1.svg";
import meter2 from "../assets/meter2.svg";
import meter3 from "../assets/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/color-sharp.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Skills = () => {
  const carouselRef = useRef();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current.next();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <TrackVisibility partialVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomInDown skill-bx" : "skill-bx"}>
                  <h2>Skills</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br /> Lorem Ipsum has been the industry's standard dummy text.</p>
                  <Carousel ref={carouselRef} arrows={false} responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                    <div className="item">
                      <img src={meter1} alt="Image" />
                      <h5>Web Development</h5>
                    </div>
                    <div className="item">
                      <img src={meter2} alt="Image" />
                      <h5>Brand Identity</h5>
                    </div>
                    <div className="item">
                      <img src={meter3} alt="Image" />
                      <h5>Logo Design</h5>
                    </div>
                    <div className="item">
                      <img src={meter1} alt="Image" />
                      <h5>Competitive Programmer</h5>
                    </div>
                  </Carousel>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};

 