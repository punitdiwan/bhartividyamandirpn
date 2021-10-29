import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Layout from "../Component/Layout";

const HomePage = () => {
  return (
    <>
      <Layout>

        <div
          className="flex flex-col md:flex-row w-full justify-center font-normal leading-7 
         text-base px-5 md:px-16 pt-10 text-gray-600 bg-[#cbdcf8]"
        >
          <div className="w-4/5 md:w-5/12 ">
            <img src="https://rosemarydn.com/images/school.PNG"></img>
          </div>
          <div className="w-5/5 md:w-6/12 ">
            <h2 >School Message</h2>
            We believe that every child is Unique and has a different learning
            approach. We, at Rose Mary, observe the talents and qualities and
            focus on them for educating the child. We facilitate the students to
            become spiritually deep rooted, morally upright & emotionally mature.
            We equip students with a sound value system to live as good human
            beings & impart substantial knowledge and skill to achieve excellence
            in diverse fields.
          </div>
        </div>
        <div className="flex flex-row justify-center text-center text-black no-underline bg-purple-300 ">
          <div className="m-3 border-2 border-solid  border-white   md:my-5 md:mx-5"> 
           <a className="" href="/ContactUs">
            <img
              className="  h-[100px]  "
              src="https://rosemarydn.com/images/tc.png"
              alt="slide1"

            />
          </a>ContactUs
          </div>
          <div className="m-3 border-2 border-white border-solid md:my-5 md:mx-5">
            <a className="" href="/Gallery">
              <img
                className="  h-[100px]  "
                src="https://rosemarydn.com/images/photo.png"
                alt="slide1"
              />

            </a>Photo-Gallery
          </div>
        </div></Layout>
    </>
  );
};

export default HomePage;
