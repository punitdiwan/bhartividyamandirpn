import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6"

const Footer = ({ header_data }) => {
  const schoolData = header_data?.data?.[0]

  const locations = [
    "Kolar Road", "Harshwardhan Nagar", "Jahangirabad", "Dwarka Nagar", "Chhola",
    "Semra Kalan", "Arera Colony","Panchsheel Nagar", "Nishatpura", "Karariya","Chandbarh"
  ]

  const quickLinksColumn1 = [
    { to: '/', label: 'Home' },
    { to: '/AboutUs', label: 'About Us' },
    { to: '/Gallery', label: 'Media' },
    { to: '/Facilities', label: 'Facilities' },
  ]

  const quickLinksColumn2 = [
    { to: '/AdmissionPage', label: 'Admissions' },
    { to: '/CareersPage', label: 'Career' },
    { to: '/blog', label: 'Blogs' },
    { to: '/Contactus', label: 'Contact Us' },
  ]

  const socialLinks = [
    { href: schoolData?.facebook, icon: <FaFacebookF />, label: 'Facebook' },
    { href: schoolData?.twitter, icon: <FaXTwitter />, label: 'X' },
    { href: schoolData?.instagram, icon: <FaInstagram />, label: 'Instagram' },
  ]

  return (
    <>
      <footer className="bg-[#1b3359] py-16 px-6 md:px-20 text-white font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Top Section: Locations */}
          <div className="mb-6">
            <div className="text-white text-4xl font-bold mb-3">
              Rose Mary School's in Bhopal City
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-sm md:text-[14px] font-medium opacity-90">
              {locations.map((loc, index) => (
                <React.Fragment key={loc}>
                  <span>{loc}</span>
                  {index < locations.length - 1 && <span className="opacity-50">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <hr className="border-white/20 mb-8" />

          {/* Middle Section: Contact & Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
            {/* Contact Us */}
            <div className="max-w-md">
              <h3 className="text-white text-lg font-bold mb-6 underline decoration-white/30 underline-offset-8">Contact Us</h3>
              <div className="space-y-4 text-[15px] leading-[1.6] opacity-90">
                <p>
                  {schoolData?.footer_address || ""}
                </p>
                <div className="space-y-1">
                  <p><span className="font-bold">Email Address :</span> {schoolData?.email || ""}</p>
                  <p><span className="font-bold">Mobile No :</span> {schoolData?.mobile || ""}</p>
                  <p><span className="font-bold">Telephone No :</span> {schoolData?.phone || ""}</p>
                </div>
                {/* <p><span className="font-bold">Affiliation Number :</span> {schoolData?.affiliation_number || ""}</p> */}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-bold mb-6 lg:ml-20 underline decoration-white/30 underline-offset-8">Quick Links</h3>
              <div className="grid grid-cols-2 gap-x-8 lg:ml-20">
                <ul className="space-y-3 text-[15px]">
                  {quickLinksColumn1.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="hover:text-yellow-300 hover:no-underline transition-colors block">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-3 text-[15px]">
                  {quickLinksColumn2.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="hover:text-yellow-300 hover:no-underline transition-colors block">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <hr className="border-white/20 mb-10" />

          {/* Social Media Section */}
          <div className="flex flex-col items-center">
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-white text-[#042e9a] rounded-full flex items-center justify-center hover:bg-yellow-300 hover:scale-110 transition-all text-xl shadow-lg"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Bottom Footer Links */}
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm font-medium">
              <span className="opacity-80">@Copyright 2026.</span>
              <span className="opacity-30">|</span>
              <Link to="/" className="hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <span className="opacity-30">|</span>
              <Link to="/" className="hover:text-yellow-300 transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Designed By Bar */}
      <div className="bg-[#132f57] py-4 text-white flex flex-col md:flex-row md:justify-around justify-center text-center items-center gap-3">
        <div>All Rights Reserved.</div>
        <div>
          <a
            className="flex flex-row justify-center items-center text-white no-underline hover:text-gray-300 transition-colors"
            href="http://maitretech.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Designed with
            <svg
              className="w-[25px] h-[25px] text-red-600 px-1"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M414.9 24C361.8 24 312 65.7 288 89.3 264 65.7 214.2 24 161.1 24 70.3 24 16 76.9 16 165.5c0 72.6 66.8 133.3 69.2 135.4l187 180.8c8.8 8.5 22.8 8.5 31.6 0l186.7-180.2c2.7-2.7 69.5-63.5 69.5-136C560 76.9 505.7 24 414.9 24z"
              />
            </svg>
            by maitretech.com
          </a>
        </div>
      </div>
    </>
  )
}

export default Footer
