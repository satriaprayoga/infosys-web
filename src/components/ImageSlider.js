import React, { useState } from 'react'
import './ImageSlider.css'
import {FaArrowAltCircleRight,FaArrowAltCircleLeft} from 'react-icons/fa';

const ImageSlider = (props) => {

    const [current,setCurrent]=useState(0);
    const length=props.data.length;

    const nextSlide=()=>{
        setCurrent(current === length - 1 ? 0 : current +1)
    }

    const prevSlide=()=>{
        setCurrent(current === 0 ? length-1 : current -1)
    }

    console.log(current);
    console.log(length);

    if(!Array.isArray(props.data) || props.data.length <=0){
        return null;
    }

    return (
       <>
       <section className="slider">
       <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
       <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide}/>
        {props.data.map((slide,index)=>{
            return (
                <div className={index === current ? 'slide-active':'slide'} key={index}>
                      {index===current && (<img src={slide.src} alt="travel image" className="image"/>)}
                </div>
            )
            
          
            
        })}
       </section>
       </>
    )
}

export default ImageSlider
