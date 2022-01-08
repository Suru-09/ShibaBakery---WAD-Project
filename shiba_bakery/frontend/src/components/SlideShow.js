import React from 'react';
import { Slide } from 'react-slideshow-image';
import '../../static/css/slideshow.css';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
  "../../static/images/3.jpg",
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
      <Slide easing="ease">
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[0]})`}}>
            
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