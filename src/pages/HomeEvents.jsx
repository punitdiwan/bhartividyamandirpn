import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const SCHOOL = import.meta.env.VITE_SCHOOL || 'technicaltesting'

const HomeEvents = () => {
  const [value, onChange] = useState(new Date())
  const [data, setdata] = useState('')
  const [birthdays, setBirthdays] = useState([])
  const [birthdaysLoading, setBirthdaysLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${SCHOOL}/items/toppers?fields=*,photo.*`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
      })
      .then(response => {
        if (response?.data?.data?.length > 0) {
          setdata(response)
        }
      })
      .catch(error => console.log("Toppers fetch error:", error))

    axios
      .post(`/api/school-data`, {
        path: `/api/website/birthdays`,
        school_id: 'bhartividyamandirpn'
      })
      .then(response => {
        console.log("Birthday Data Received:", response.data);
        setBirthdays(response?.data?.birthdays || [])
      })
      .catch(error => {
        console.log("Birthdays fetch error:", error)
        setBirthdays([])
      })
      .finally(() => setBirthdaysLoading(false))

    axios
      .get(`${BASE_URL}/${SCHOOL}/items/events`)
      .then(response => {
        setEvents(response?.data?.data || [])
      })
      .catch(error => {
        console.log("Events fetch error:", error)
        setEvents([])
      })
      .finally(() => setEventsLoading(false))
  }, [])

  return (
    <div className="md:grid p-5 md:grid-cols-3 sm:grid sm:grid-cols-2 bg-[#0066cc]">
      <div className="mx-3">
        <h1 className="py-2 text-center text-[white]"><b>Student Birthday</b></h1>
        <div style={{ position: 'relative', height: '305px' }} className="m-2 bg-[#d4d1d1] overflow-hidden rounded-lg shadow-lg">
          {birthdaysLoading ? (
            <div className="animate-pulse text-center py-20 text-indigo-900 font-semibold">
              Loading Birthdays...
            </div>
          ) : birthdays.length === 0 ? (
            <div className="text-center py-20 text-gray-600 font-semibold h-full flex items-center justify-center bg-white italic">
              No Birthdays Today
            </div>
          ) : (
            <>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showArrows={false}
                showStatus={false}
                interval={4000}
                className="birthday-carousel h-full"
              >
                {birthdays.map((item, index) => (
                  <div
                    key={index}
                    className="relative h-[305px] flex items-center justify-center p-4 bg-gradient-to-br from-[#049af0] to-[#f4f5f6de] overflow-hidden"
                  >
                    {/* Glowing decorative elements */}
                    <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-purple-400/30 rounded-full blur-2xl animate-pulse"></div>

                    <div className="relative z-10 w-full h-full border-2 border-white/30 rounded-[2rem] flex flex-col items-center justify-center p-5 bg-white/10 backdrop-blur-md shadow-2xl overflow-hidden">
                      {/* Festive Icons */}
                      <div className="absolute top-3 left-4 text-2xl animate-bounce">🎉</div>
                      <div
                        className="absolute top-3 right-4 text-2xl animate-bounce"
                        style={{ animationDelay: '0.5s' }}
                      >
                        ✨
                      </div>

                      <h2 className="text-black text-2xl font-black mb-0 uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                        Happy Birthday
                      </h2>

                      <div className="relative group">
                        <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-md group-hover:bg-yellow-400/40 transition-all"></div>

                        <div className="w-[140px] h-[140px] rounded-3xl border-4 border-yellow-400 p-1 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative z-10 transform transition-transform group-hover:scale-105 duration-500">
                          <img
                            src={item?.photo_url || 'https://via.placeholder.com/150?text=Student'}
                            className="w-full h-full object-contain rounded-2xl"
                            alt={item.name}
                          />
                        </div>
                      </div>

                      <div className="text-center mt-2 w-full">
                        <div className="inline-block bg-yellow-400 text-black px-6 py-1.5 rounded-full font-black text-lg shadow-[0_4px_15px_rgba(255,215,0,0.4)] transform transition-all hover:scale-110">
                          {item.name?.toUpperCase()}
                        </div>

                        <p className="text-black text-[15px] mt-1 font-bold italic tracking-wide opacity-90 drop-shadow-md">
                          Wishing you the happiest of birthday <br />
                          and a year full of blessings.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>

              {/* Previous Button */}
              <button
                onClick={() =>
                  document.querySelector('.birthday-carousel .control-prev')?.click()
                }
                className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow-lg"
              >
                ‹
              </button>

              {/* Next Button */}
              <button
                onClick={() =>
                  document.querySelector('.birthday-carousel .control-next')?.click()
                }
                className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow-lg"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center mx-3 text-center">
        <h1 className="py-2 text-center text-[white]"><b>News & Events</b></h1>
        <div style={{ position: 'relative', height: '305px', width: '100%' }} className="m-2 bg-[#d4d1d1] rounded-lg shadow-lg overflow-hidden">
          <marquee behavior="scroll" direction="up" scrollamount="4" style={{ height: '305px', width: '100%' }}>
            <div className="m-5 bg-white">
              {eventsLoading ? (
                <div className="space-y-3 animate-pulse text-center py-10 text-gray-600 font-semibold">
                  Loading Events...
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-10 text-gray-600 font-semibold">
                  No Upcoming Events
                </div>
              ) : (
                events.map((ei, i) => (
                  <div className="flex mb-2" key={i}>
                    <div className="bg-indigo-900 text-white w-[25%] py-5 px-2">
                      {ei?.eventdate}
                    </div>
                    <div className="px-2 py-5 bg-purple-100 w-[75%]">
                      {ei?.title}
                    </div>
                  </div>
                ))
              )}
            </div>
          </marquee>
        </div>
      </div>

      <div className="mx-3">
        <h1 className="py-2 text-center text-[white]">
          <b>Topper (2025-2026)</b>
        </h1>
 
     <div
     style={{ position: 'relative', height: '305px' }}
     className="overflow-hidden rounded-lg shadow-lg mt-2"
   >
     {!data ? (
       <div className="animate-pulse text-center py-20 text-white font-semibold">
         Loading Toppers...
       </div>
     ) : data?.data?.data?.length === 0 ? (
       <div className="text-center py-20 text-white font-semibold">
         No Data Available
       </div>
     ) : (
       <>
         <Carousel
           showThumbs={false}
           autoPlay={true}
           infiniteLoop={true}
           showArrows={false}
           showStatus={false}
           interval={4000}
           className="topper-carousel h-full"
         >
           {data?.data?.data.map((item, index) => (
             <div
               key={index}
               className="relative h-[305px] bg-black"
             >
               <img
                 src={item?.photo?.data?.full_url?.replace(
                   'http://',
                   'https://'
                 )}
                 className="h-[305px] w-full object-fill"
                 alt={item.name}
               />
 
               <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-2">
                 <h4 className="text-white text-center font-bold text-lg">
                   {item.name}
                 </h4>
               </div>
             </div>
           ))}
         </Carousel>
 
         {/* Previous Button */}
         <button
           onClick={() =>
             document
               .querySelector('.topper-carousel .control-prev')
               ?.click()
           }
           className="absolute top-1/2 left-2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow-lg"
         >
           ‹
         </button>
 
         {/* Next Button */}
         <button
           onClick={() =>
             document
               .querySelector('.topper-carousel .control-next')
               ?.click()
           }
           className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center shadow-lg"
         >
           ›
         </button>
       </>
     )}
   </div>
 </div>
    </div>
  )
}

export default HomeEvents
