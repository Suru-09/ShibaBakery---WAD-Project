import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../../static/css/slideshow.css';
import 'react-slideshow-image/dist/styles.css'
// import "node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';

const slideImages = [
  "../../static/images/cake.mp4",
  '../../static/images/image.jpg',
  '../../static/images/bacgound3.jpg'
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const Slideshow = () => {
    return (
      <Slide easing="ease" {...properties}>
        <div className="each-slide">
            <div>
                <video
                    src={slideImages[0]}
                    controls
                    muted
                    autoPlay={"autoplay"}
                    preload="auto"
                    loop
                />
            </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            
          </div>
        </div>
      </Slide>
    )
}

export default Slideshow;