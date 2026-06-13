import React from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const fetcher = url => fetch(url).then(r => r.json())

const GalleryFacebookSection = ({ header_data }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL
  const schoolData = header_data?.data?.[0]

  const { data: gallery_data } = useSWR(
    `${baseUrl}/${school}/items/gallery?fields=*.*.*`,
    fetcher
  )

  const galleryItems = gallery_data?.data?.slice(0, 5) || []

  return (
    <div className="bg-[#f8f9fa] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">

          {/* 1. Photo Gallery Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">Photo Gallery</h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="relative h-[350px] overflow-hidden rounded-md">
                {galleryItems.length > 0 ? (
                  <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    interval={4000}
                    transitionTime={1000}
                    stopOnHover={true}
                    swipeable={true}
                    className="h-full"
                  >
                    {galleryItems.map((item, index) => (
                      <div key={index} className="h-[350px]">
                        <img
                          src={item?.photo?.data?.full_url?.replace('http://', 'https://')}
                          alt={`Gallery Image ${index + 1}`}
                          className="h-full w-full object-fill object-center"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50 flex-col gap-4">
                    <div className="w-12 h-12 border-4 border-[#1b3359] border-t-red-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading gallery...</p>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/Gallery"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition-all duration-300 text-xs tracking-widest uppercase text-center w-full max-w-[220px]"
            >
              View All Gallery
            </Link>
          </div>

                    {/* 2. Instagram Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">Social Connect</h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="h-[350px] overflow-hidden rounded-md bg-gray-50">
                <iframe
                  src="https://www.instagram.com/reel/DXn5G3GiJ8t/embed"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allow="encrypted-media"
                  title="Instagram Reel"
                ></iframe>
              </div>
            </div>

            <a
              href="https://www.instagram.com/reel/DXn5G3GiJ8t/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition-all duration-300 text-xs tracking-widest uppercase text-center w-full max-w-[220px]"
            >
              View On Instagram
            </a>
          </div>

                    {/* 3. Facebook Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">Social Connect</h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="h-[350px] overflow-hidden rounded-md bg-gray-50">
                <iframe
                  src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02y1tcJcbLBT9vUeqwqvD54r4HPJT7PW8C7VefjXu6ZYUZA5inchMaXNgFBzkoD5eYl%26id%3D100093613810945&show_text=true&width=500" width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Latest Post"
                ></iframe>
              </div>
            </div>

            <a
              href={schoolData?.facebook || "https://www.facebook.com/share/1ZRw2qyYfL/"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition-all duration-300 text-xs tracking-widest uppercase text-center w-full max-w-[220px]"
            >
              View On Facebook
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default GalleryFacebookSection
