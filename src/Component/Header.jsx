import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BrochureDownload from "./BrochureDownload";

const Header = ({ header_data }) => {
  const [abovetop, setabovetop] = useState('8rem')

  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY < 1 ? '8rem' : '0px'
      setabovetop(top)
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  const schoolData = header_data?.data?.[0]
  const isLoading = !header_data

  const school = import.meta.env.VITE_SCHOOL;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const brochureEndpoint = `${baseUrl}/${school}/items/brochure?fields=*.*.*`;

  return (
    <>
      <div className=" ">
        <div className="flex justify-center h-40 pt-3 text-center bg-header bg-[#1b3359] bg-repeat-x">
          {isLoading ? (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="h-20 w-16 bg-white/20 rounded" />
              <div className="flex flex-col gap-2">
                <div className="h-8 w-72 bg-white/20 rounded" />
                <div className="h-4 w-48 bg-white/20 rounded" />
              </div>
            </div>
          ) : (
            <>
              <img
                className="h-32 w-32 md:mr-10"
                src={schoolData?.logo?.data?.full_url?.replace('http://', 'https://')}
              />
              <div className="mt-4 text-white item-center ml-1">
              <span
  className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
  style={{ fontFamily: "'Fugaz One', cursive" }}
>
  {schoolData?.title}
</span>
                <p className="mt-2 mr-2 sm:justify-items-center text-white text-xl sm:text-2xl md:text-3xl" style={{ fontFamily: "'Fugaz One', cursive" }}>
                  {schoolData?.area}
                </p>
              </div>
            </>
          )}
        </div>
        <nav
          className="sticky z-10 bg-white shadow-sm"
          style={{ top: `${abovetop}` }}
        >
          <div className="flex items-center justify-center px-4 py-3 lg:hidden">
            {/* Mobile Menu Button */}
            <label
              htmlFor="menu-toggle"
              className="cursor-pointer border border-gray-400 rounded p-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <input id="menu-toggle" type="checkbox" className="peer hidden" />

          {/* Menu Container */}
          <div
            className="
              hidden
              peer-checked:flex
              flex-col
              items-center
              w-full
              bg-white
              lg:flex
              lg:flex-row
              lg:justify-center
              lg:items-center
              lg:gap-8
              lg:px-6
              lg:py-4
            "
          >
            {/* Home */}
            <Link
              to="/"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Home
            </Link>

            {/* About Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-2 text-black whitespace-nowrap">
                About Us
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21L10 12l4.77-4.79 1.41 1.42L10 14.84 3.82 8.63z" />
                </svg>
              </button>

              <ul className="absolute left-0 hidden min-w-[220px] bg-blue-600 text-white shadow-lg group-hover:block z-50">
                <li>
                  <Link
                    to="/AboutUs"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/DirectorMessage"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Director Message
                  </Link>
                </li>

                <li>
                  <Link
                    to="/PrincipalMessage"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Principal Message
                  </Link>
                </li>

                <li>
                  <Link
                    to="/OurMangment"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Management Message
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Faculty"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Administrative Staff
                  </Link>
                </li>
              </ul>
            </div>

            {/* Academics Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 py-2 text-black whitespace-nowrap">
                Academics
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21L10 12l4.77-4.79 1.41 1.42L10 14.84 3.82 8.63z" />
                </svg>
              </button>

              <ul className="absolute left-0 hidden min-w-[220px] bg-blue-600 text-white shadow-lg group-hover:block z-50">
                <li>
                  <Link
                    to="/AdmissionProcedure"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Admission Procedure
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Facilities"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Facilities
                  </Link>
                </li>

                {/* <li>
                  <Link
                    to="/BookList"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Book List
                  </Link>
                </li> */}

                {/* <li>
                  <Link
                    to="/FeesStructure"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Fees Structure
                  </Link>
                </li> */}

                <li>
                  <Link
                    to="/Uniform"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Uniform
                  </Link>
                </li>

                {/* <li>   
                  <Link
                    to="/ExamTimetable"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Exam Timetable
                  </Link>
                </li> */}
              </ul>
            </div>

            {/* Other Links */}
            <Link
              to="/NewsEvents"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Achievements & Events
            </Link>

            {/* <Link
              to="/Gallery"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Gallery
            </Link> */}

            <div className="relative group">
              <button className="flex items-center gap-1 py-2 text-black whitespace-nowrap">
                Media
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.23 7.21L10 12l4.77-4.79 1.41 1.42L10 14.84 3.82 8.63z" />
                </svg>
              </button>

              <ul className="absolute left-0 hidden min-w-[220px] bg-blue-600 text-white shadow-lg group-hover:block z-50">
                <li>
                  <Link
                    to="/Gallery"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Photos
                  </Link>
                </li>

                <li>
                  <Link
                    to="/Videos"
                    className="block px-4 py-2 hover:bg-white hover:text-black"
                  >
                    Video
                  </Link>
                </li>

              </ul>
            </div>



            <Link
              to="/AdmissionPage"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Admission
            </Link>

            <Link
              to="/CareersPage"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Career
            </Link>

            <Link
              to="/blog"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Blog
            </Link>

            <Link
              to="/Contactus"
              className="py-2 text-black whitespace-nowrap hover:text-blue-600 hover:no-underline"
            >
              Contact Us
            </Link>

            {/* Login Button */}
            <a
              href="https://cms.schoolscoop.co.in/admin/#/login?project=bhartividyamandirpn"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-500 text-white px-4 py-2 rounded whitespace-nowrap hover:bg-red-600"
            >
              Login
            </a>
          </div>
        </nav>
      </div>
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[1000] flex items-center pointer-events-none">
        <BrochureDownload
          endpoint={brochureEndpoint}
          className="pointer-events-auto bg-red-600 text-white px-2 py-4 rounded-l-2xl shadow-[0_0_20px_rgba(0,0,0,0.3)] [writing-mode:vertical-rl] [text-orientation:mixed] hover:bg-[#1b3359] transition-all duration-300 font-bold uppercase tracking-widest text-[10px] sm:text-xs border-y border-l border-white/20"
        />
      </div>
    </>
  )
}

export default Header
