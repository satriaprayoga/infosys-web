import React from 'react'
import Slider from 'react-slick';
import './Highlight.css'
import HighlightItem from './HighlightItem';

const Highlight = props => {
    const settings = {
        dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
      };
    return (
        <div className="highlight">
            <h1>Check out our PROMOTIONS</h1>
           <div className="highlight_container">
            <div className="highlight_wrapper">
                <div className="highlight_items">
                <Slider {...settings} >
                    
            <HighlightItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
            <HighlightItem
              src='images/img-3.jpg'
              text='Set Sail in the Atlantic Ocean visiting Uncharted Waters'
              label='Mystery'
              path='/services'
            />
                    </Slider>
                </div>
            </div>
           </div>
        </div>
    )
}



export default Highlight
