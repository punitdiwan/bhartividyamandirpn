
import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import { base_url, school_name } from '../SimpleState/auth'

const HomeEvents = () => {
    const [value, onChange] = useState(new Date()); //this is for Calendar
    const [data, setdata] = useState("")
    const [data1, setdata1] = useState("")
    const get_base_url = base_url.use()
    const get_school_name = school_name.use()

    const slides = [
        // { title: "/images/image1.jpg ", description: 'Name-1' },
        // { title: " /images/image2.jpg", description: 'Name-2' },
    ];


    const filteredData = [
        { id: 2, created_on: "2020-12-15T05:19:39+00:00", eventdate: "2020-12-23", title: "Books will be available on the specific date." },
        { id: 3, created_on: "2020-12-15T08:52:50+00:00", eventdate: "2020-12-21", title: "Result has been declared" },

        { id: 2, created_on: "2020-12-15T05:19:39+00:00", eventdate: "2020-12-23", title: "Books will be available on the specific date." },
        { id: 3, created_on: "2020-12-15T08:52:50+00:00", eventdate: "2020-12-21", title: "Result has been declared" },

    ]

    const [events, setEvents] = useState([])
    const [eventsLoading, setEventsLoading] = useState(true)

    useEffect(() => {
        axios.get(`${get_base_url}/${get_school_name}/items/toppers?fields=*,photo.*`)
            .then((response) => {

                if (response?.data?.data?.length > 0) {
                    setdata(response)
                }
            })
            .catch((error) => {
                console.log(error);
            })


        axios.get(`${get_base_url}/${get_school_name}/items/events`)
            .then((response) => {
                setEvents(response?.data?.data || [])
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setEventsLoading(false)
            })

    }, [])



    return (
        <div className="  md:grid p-5   md:grid-cols-3 sm:grid  sm:grid-cols-2   bg-[#0066cc]">
            <div className="mx-3">
                <h1 className="py-2 text-center text-[white] "><b> News & Events</b></h1>
                <div style={{ height: "305px", width: "100%" }} className="m-2 bg-[#d4d1d1]">
                    <marquee behavior="scroll" direction="up" scrollamount="4" style={{ height: "305px", width: "100%" }}>
                       <div className="m-5 bg-white">

                            {eventsLoading ? (

                            /* Loading Skeleton */
                            <div className="space-y-3 animate-pulse text-center py-10 text-gray-600 font-semibold">
                                Loading Events...
                            </div>

                            ) : events.length === 0 ? (

                            /* No Events */
                            <div className="text-center py-10 text-gray-600 font-semibold">
                                No Upcoming Events
                            </div>

                            ) : (

                            /* Events Data */
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
            <div className="flex flex-col items-center mx-3 text-center">
                <h1 className="py-2 text-center text-[white] "><b> School Calendar</b></h1>
                <div className=" lg:mt-3 sm:px-5" >
                    <Calendar
                        className="bg-[#0f6580] react-calendar "
                        onChange={onChange}
                        value={value}
                         
                    />
                </div>

            </div>
            <div className="mx-3">
                <h1 className="py-2 text-center text-[white]">
                    <b> Topper (2025-2026)</b>
                </h1>

                <div style={{ position: "relative" }}>

                    {!data ? (

                        <div className="animate-pulse text-center py-20 text-white font-semibold">
                        Loading Toppers...
                        </div>

                    ) : data?.data?.data?.length === 0 ? (

                        <div className="text-center py-20 text-white font-semibold">
                            No Data Available
                        </div>

                    ) : (

                        <Carousel
                        showThumbs={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showArrows={false}
                        showStatus={false}
                        >
                        {data?.data?.data.map((item, index) => (
                            <div key={index}>
                            <img
                                src={item?.photo?.data?.full_url?.replace('http://', 'https://')}
                                style={{ height: "300px", width: "100%" }}
                                alt=""
                            />
                            <h4 className="text-white">{item.name}</h4>
                            </div>
                        ))}
                        </Carousel>

                    )}

                    {/* LEFT ARROW */}
                    <button
                        onClick={() => document.querySelector('.carousel .control-prev')?.click()}
                        style={{
                        position: "absolute",
                        top: "50%",
                        left: "5px",
                        transform: "translateY(-50%)",
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer"
                        }}
                    >
                        ‹
                    </button>

                    {/* RIGHT ARROW */}
                    <button
                        onClick={() => document.querySelector('.carousel .control-next')?.click()}
                        style={{
                        position: "absolute",
                        top: "50%",
                        right: "5px",
                        transform: "translateY(-50%)",
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        cursor: "pointer"
                        }}
                    >
                        ›
                    </button>

                </div>
            </div>
        </div>
    )
}

export default HomeEvents


