import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import React from 'react'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'



const Slider = ({ slider_data }) => {
  if (!slider_data) {
    return (
      <div className="mt-14 w-full h-[300px] md:h-[500px] lg:h-[640px] bg-gray-200 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading Slider...</span>
      </div>
    )
  }

  const sortedSlides = slider_data?.data
    ? [...slider_data.data].sort((a, b) => a.sort_order - b.sort_order)
    : []

  if (sortedSlides.length === 0) return null

  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showStatus={false}
        className="mt-1"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition"
            >
              <IoIosArrowBack size={26} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 text-white p-3 rounded-full hover:bg-white hover:text-black transition"
            >
              <IoIosArrowForward size={26} />
            </button>
          )
        }
      >
        {sortedSlides.map((item, index) => (
          <div key={index}>
            <img
              src={item?.image?.data?.full_url?.replace('http://', 'https://')}
              className="relative w-full h-[300px] md:h-[500px] lg:h-[640px]"
              alt="slider_img"
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Slider
