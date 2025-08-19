import React, { Component } from "react";
const Footer = ({header_data}) => {

  // console.log(header_data)
  
  return (
    <>
      <div className="bg-gradient-to-r text-[#e0d917] from-footers-default  to-footerend-default px-6  py-16   md:px-20 flex md:flex-row flex-col justify-evenly ">
        <div className="">
          <div className="flex flex-row ">
            <img
            src={header_data?.data? header_data?.data[0]?.logo?.data?.full_url?.replace('http://', 'https://') : "https://rosemarydn.com/images/logo.png"}
              // src="https://rosemarydn.com/images/logo.png"
              className=" h-[5rem] w-[5rem]"
            />
            <h4
              className="flex items-center ml-3 text-basetext-[#e0d917]
                "
            >
               {header_data?.data? header_data?.data[0]?.title : "Maitretech Academy Public School"}
              {/* Rose Mary Hr. Sec. School */}
            </h4>
          </div>

          <span className="flex flex-row items-center text-white  mt-2">
            <svg
              className="svg-inline--fa fa-envelope fa-w-16 ico"
              width="1em"
              height="1em"
              aria-hidden="true"
              dataprefix="fas"
              dataicon="envelope"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              datafai2svg=""
            >
              <path
                fill="currentColor"
                d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
              ></path>
            </svg>{" "}
            <span className="ml-2 "> 
            {header_data?.data? header_data?.data[0]?.email : "maitretech@example.com"}
            {/* rosemarydwarka@gmail.com */}
            </span>
          </span>

          <div className="mt-2 ">
            <hr className="myLine " />
          </div>

          <span className="flex flex-row items-center text-white">
            <svg
              className="svg-inline--fa fa-mobile-alt fa-w-10 ico"
              width="1em"
              height="1em"
              aria-hidden="true"
              dataprefix="fas"
              dataicon="mobile-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              datafai2svg=""
            >
              <path
                fill="currentColor"
                d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
              ></path>
            </svg>
            <span className="ml-2 mt-2">
            {header_data?.data? header_data?.data[0]?.phone : "111111211"}
              {/* 0755-2740018 */}
              </span>
          </span>
          <span className="flex flex-row items-center text-white">
            <svg
              className="svg-inline--fa fa-mobile-alt fa-w-10 ico"
              width="1em"
              height="1em"
              aria-hidden="true"
              dataprefix="fas"
              dataicon="mobile-alt"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              datafai2svg=""
            >
              <path
                fill="currentColor"
                d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
              ></path>
            </svg>
            <span className="ml-2 mt-2">
            {header_data?.data? header_data?.data[0]?.mobile : "111111211"}
              {/* 0755-2740018 */}
              </span>
          </span>
          <div className="mt-2 " >
            <hr className="myLine" />
          </div>
          <address className="flex flex-row mt-2 text-white ">
            <svg
              className="svg-inline--fa  fa-map-marker fa-w-12 ico"
              aria-hidden="true"
              width="1em"
              height="1em"
              dataprefix="fas"
              dataicon="map-marker"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              datafai2svg=""
            >
              <path
                fill="currentColor"
                d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0z"
              ></path>
            </svg>
            <div className="ml-2 ">
            {header_data?.data? header_data?.data[0]?.address : " Maitretech School Bhopal "}
              
            {/* Maitretech School Bhopal */}
            </div>
          </address>
          <div className= "pb-5 mt-2">
            <hr className="myLine"/>
          </div>
        </div>
        {/* ==================================== */}

        <div className="md:mt-6">
          <h3 className="text-lg" >Important Links</h3>
          <ul className="">
            <li className="">
              <div
                className=" text-[#e0d917]  flex flex-row items-center  hover:no-underline "
                
              >
                <svg
                  width="3%"
                  className="svg-inline--fa fa-angle-double-right fa-w-14 ico "
                  aria-hidden="true"
                  dataprefix="fas"
                  dataicon="angle-double-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  datafai2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                  ></path>
                </svg>

                <a className="pl-1 text-lg text-white hover:no-underline " href="/">

                  Home
                </a>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center hover:no-underline"
                
              >
                <svg
                  width="3%"
                  className="svg-inline--fa  fa-angle-double-right fa-w-14 ico "
                  aria-hidden="true"
                  dataprefix="fas"
                  dataicon="angle-double-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  datafai2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                  ></path>
                </svg>
                <a className="pl-1 text-lg text-white hover:no-underline" href="Contactus">
        
                  contact us
                </a>
              </div>
            </li>
            <li>
              <div  
                className="flex flex-row items-center text-yellow-300 hover:no-underline "
                
              >
                <svg
                  width="3%"
                  className="svg-inline--fa fa-angle-double-right fa-w-14 ico"
                  aria-hidden="true"
                  dataprefix="fas"
                  dataicon="angle-double-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  datafai2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                  ></path>
                </svg>
                <a className="pl-1 text-lg text-white hover:no-underline " href="/Gallery">
            
                  Gallery
                </a>
              </div>
            </li>
            <li>
              <div
                className="flex flex-row items-center text-yellow-300 hover:no-underline"
                
              >
                <svg
                  width="3%"
                  className="svg-inline--fa fa-angle-double-right fa-w-14 ico"
                  aria-hidden="true"
                  dataprefix="fas"
                  dataicon="angle-double-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  datafai2svg=""
                >
                  <path
                    fill="currentColor"
                    d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                  ></path>
                </svg>
                <a
                  className="pl-1 text-lg text-white hover:no-underline "
                  href="/Facilities "
                >

                  Facilities
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-3 md:mt-6">
          <h3 className= " text-[#e0d917] text-lg">Follow Us</h3>
          <svg
            className=" mb-2  text-white ml-[30px] w-[1.7rem] svg-inline-fa fa-facebook-square fa-w-14 fa-2x"
            aria-hidden="true"
            dataprefix="fab"
            dataicon="facebook-square"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            datafai2svg=""
          >
            <path
              fill="currentColor"
              d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="bg-[#132f57] py-3 text-white flex flex-col md:flex-row md:justify-around justify-center text-center ">
        <div>All Rights Reserved.</div>
        <div>
          <a
            className="flex flex-row justify-center text-center text-white no-underline"
            href="http://maitretech.com/"
          >
            Designed with
            <svg
              className="w-[25px] h-[25px] text-red-700 svg-inline--fa fa-heart fa-w-18 pl-1 pr-1 "
              aria-hidden="true"
              dataprefix="fa"
              dataicon="heart"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              datafai2svg=""
            >
              <path
                fill="currentColor"
                d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"
              ></path>
            </svg>
          by maitretech.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
