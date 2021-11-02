
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const Slider = ({ slider_data }) => {

   

  const slides = [
    { title: "/images/is15.jpg ", description: 'Lorem ipsum' },
    { title: "/images/sd2.jpg", description: 'Lorem ipsum' },
  ];
  

  return (
    <div>
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}  >
        {slider_data?.data?.length > 0 ?
            slider_data?.data?.map((item, index) => {
              return <div className="carousel-inner" role="listbox" key={index} >
                <div className='carousel' role="listbox">
                  <img
                    src={item?.image?.data?.full_url}
                    className="w-full md:h-[400px] lg:h-[500px] h-[230px]"
                    alt="sorry_no_img"
                  />
                </div>
              </div>
            })
            :
            slides.map((slide, index) => {
              return <div className="carousel-inner" key={index} role="listbox">
                <div className='carousel' role="listbox">
                  <img
                    src={slide.title}
                    height={500} width={1500}
                    alt="sorry_no_img"
                    className="w-full md:h-[400px] lg:h-[500px]"
                  />
                </div>
              </div>
            })}
      </Carousel>
    </div>
  )
}

export default Slider

 
  