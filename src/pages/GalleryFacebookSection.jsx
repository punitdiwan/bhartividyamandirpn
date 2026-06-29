import React from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const fetcher = (url) => fetch(url).then((r) => r.json());

const GalleryFacebookSection = ({ header_data }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const school = import.meta.env.VITE_SCHOOL;

  const schoolData = header_data?.data?.[0];
  console.log("School Data:", schoolData);

  const { data: gallery_data } = useSWR(
    `${baseUrl}/${school}/items/gallery?fields=*.*.*`,
    fetcher
  );

  const galleryItems = gallery_data?.data?.slice(0, 5) || [];

  // CMS Links
  const instagramUrl = schoolData?.instagram || "";
  const facebookUrl = schoolData?.facebook || "";

  // Instagram Embed
  const instagramEmbed = instagramUrl
    ? `${instagramUrl.replace(/\/$/, "")}/embed`
    : "";

  // Facebook Embed
  const facebookEmbed = facebookUrl
    ? `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(
        facebookUrl
      )}&show_text=true&width=500`
    : "";

  return (
    <div className="bg-[#f8f9fa] py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">

          {/* ================= Gallery ================= */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">
                Photo Gallery
              </h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="relative h-[350px] overflow-hidden rounded-md">
                {galleryItems.length > 0 ? (
                  <Carousel
                    autoPlay
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                    interval={4000}
                    transitionTime={1000}
                    stopOnHover
                    swipeable
                  >
                    {galleryItems.map((item, index) => (
                      <div key={index} className="h-[350px]">
                        <img
                          src={item?.photo?.data?.full_url?.replace(
                            "http://",
                            "https://"
                          )}
                          alt={`Gallery ${index + 1}`}
                          className="h-full w-full object-fill"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="flex items-center justify-center h-full flex-col gap-4">
                    <div className="w-12 h-12 border-4 border-[#1b3359] border-t-red-600 rounded-full animate-spin"></div>
                    <p>Loading Gallery...</p>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/Gallery"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition text-xs uppercase text-center w-full max-w-[220px]"
            >
              View All Gallery
            </Link>
          </div>

          {/* ================= Instagram ================= */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">
                Instagram
              </h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="h-[350px] overflow-hidden rounded-md bg-gray-50">

                {instagramUrl ? (
                  <iframe
                    src={instagramEmbed}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allow="encrypted-media"
                    title="Instagram"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    Instagram Link Not Available
                  </div>
                )}

              </div>
            </div>

            <a
              href={instagramUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition text-xs uppercase text-center w-full max-w-[220px]"
            >
              View On Instagram
            </a>
          </div>

          {/* ================= Facebook ================= */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
              <h2 className="text-xl font-bold text-[#1b3359] uppercase tracking-wide">
                Facebook
              </h2>
              <div className="w-8 h-[2px] bg-[#1b3359]"></div>
            </div>

            <div className="w-full bg-white p-2 rounded-lg shadow-xl mb-8 border border-gray-200">
              <div className="h-[350px] overflow-hidden rounded-md bg-gray-50">

                {facebookUrl ? (
                  <iframe
                    src={facebookEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: "none", overflow: "hidden" }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                    title="Facebook"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    Facebook Link Not Available
                  </div>
                )}

              </div>
            </div>

            <a
              href={facebookUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#385a91] text-white px-8 py-3 rounded-md font-bold shadow-md hover:bg-[#1b3359] transition text-xs uppercase text-center w-full max-w-[220px]"
            >
              View On Facebook
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GalleryFacebookSection;