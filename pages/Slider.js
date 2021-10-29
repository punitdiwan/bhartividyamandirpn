
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
 

const Slider = () => { 
  
  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()

  useEffect(() => {
      axios.get(`${get_base_url}/${get_school_name}/items/slider?status=published&fields=caption,image.data.full_url`)
          .then((response) => { 
              if (response?.data?.data?.length > 0) {
                  setdata(response)
              } 
          })
          .catch((error) => {
              console.log(error);
          }) 

  }, [])  
  
  const slides = [
    { title: "/images/is15.jpg ", description: 'Lorem ipsum' },
    { title: "/images/sd2.jpg", description: 'Lorem ipsum' },
    // { title: " ", description: 'Lorem ipsum' }
];
  
  // const slides = [
  //   { title: "https://rosemarydn.com/images/1.jpg", description: 'Lorem1 ipsum' },
  //   { title: "https://rosemarydn.com/images/2.jpg", description: 'Lorem2 ipsum' },
  //   { title: "https://rosemarydn.com/images/3.jpg", description: 'Lorem3 ipsum' },
  //   { title: "https://rosemarydn.com/images/4.jpg", description: 'Lorem3 ipsum' }

  // ];


  return (
    <div>
      <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}  >
        {
       data?.data?.data?.map((item, index) => {
          return <div className="carousel-inner" role="listbox"  key={index} >
            <div className='carousel'  role="listbox">
              <img
               src={item?.image?.data?.full_url} 
               className="w-full md:h-[400px] lg:h-[500px]"
                alt="sorry_no_img"
              />
            </div>
          </div>
        })
        || slides.map((slide, index) => {
          return <div className="carousel-inner"   key={index} role="listbox">
            <div className='carousel'role="listbox">
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

      {/* <div className="slide-container">
        <Slide>
          <div className="each-slide">
            {
              slides.map((data, i) => {
                return <div>
                  <img src={data?.title} alt="slide1" width="100%" />
                </div>
              })
            }


          </div>
          <div className="each-slide">
            <div>
              <img
                src="https://rosemarydn.com/images/2.jpg"
                alt="slide2"
                width="100%"
              />
            </div>
          </div>
          <div className="each-slide">
            <div>
              <img
                src="https://rosemarydn.com/images/3.jpg"
                alt="slide3"
                width="100%"
              />
            </div>
          </div>
          <div className="each-slide">
            <div>
              <img
                src="https://rosemarydn.com/images/4.jpg"
                alt="slide4"
                width="100%"
              />
            </div>
          </div>
        </Slide>
      </div> */}
    </div>
  )
}

export default Slider
