import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const Slider = ({ slider_data }) => {

  const slides = [
    { title: "/images/is15.jpg", description: "Lorem ipsum" },
    { title: "/images/sd2.jpg", description: "Lorem ipsum" },
  ];
  const sortedSlides = slider_data?.data
    ? [...slider_data.data].sort((a, b) => a.sort_order - b.sort_order)
    : [];
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showStatus={false}
        className="mt-14"

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
        {sortedSlides.length > 0
          ? sortedSlides.map((item, index) => (
            <div key={index}>
              <img
                src={item?.image?.data?.full_url?.replace("http://", "https://")}
                className="w-full md:h-[400px] lg:h-[500px] h-[230px] object-cover"
                alt="slider_img"
              />
            </div>
          ))
          : slides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.title}
                alt="slider_img"
                className="w-full md:h-[400px] lg:h-[500px] h-[230px] object-cover"
              />
            </div>
          ))}
      </Carousel>
    </div>
  );
};

export default Slider;