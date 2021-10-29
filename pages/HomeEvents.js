
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
        { title: "/images/is3.jpg ", description: 'Name-1' },
        { title: " /images/is5.jpg", description: 'Name-2' },
    ];


    const filteredData = [
        { id: 2, created_on: "2020-12-15T05:19:39+00:00", eventdate: "2020-12-23", title: "Books will be available on the specific date." },
        { id: 3, created_on: "2020-12-15T08:52:50+00:00", eventdate: "2020-12-21", title: "Result has been declared" },

        { id: 2, created_on: "2020-12-15T05:19:39+00:00", eventdate: "2020-12-23", title: "Books will be available on the specific date." },
        { id: 3, created_on: "2020-12-15T08:52:50+00:00", eventdate: "2020-12-21", title: "Result has been declared" },

    ]


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

                if (response?.data?.data?.length > 0) {
                    setdata1(response)

                }

            })
            .catch((error) => {
                console.log(error);
            })

    }, [])



    return (
        <div className="  md:grid p-5   md:grid-cols-3 sm:grid  sm:grid-cols-2   bg-[#0066cc]">
            <div className="mx-3">
                <h1 className="py-2 text-center text-[white] "><b> News & Events</b></h1>
                <div style={{ height: "305px", width: "100%" }} className="m-2 bg-[#d4d1d1]">
                    <marquee behavior="scroll" direction="up" scrollamount="4" style={{ height: "305px", width: "100%" }}>
                        <div className="m-5 bg-[white]  ">
                            {
                                data1?.data?.data.map((ei, i) =>
                                (<div className="flex mb-2" key={i}>
                                    <div className="bg-indigo-900 text-[white] w-[25%]  py-5 px-2  ">{ei?.eventdate}</div>
                                    <div className="px-2 py-5 bg-purple-100 w-[75%]">{ei?.title}</div>
                                </div>))
                                ||
                                filteredData.map((eii, i) => (
                                    <div className="flex mb-2" key={i}>
                                        <div className="bg-indigo-900 text-[white] w-[25%]  py-5 px-2 ">{eii?.eventdate}</div>
                                        <div className="px-2 py-5 bg-purple-100 w-[75%]">{eii?.title}</div>
                                    </div>
                                ))
                            }

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
                <h1 className="py-2 text-center text-[white] "><b> Topper (2019-2020)</b></h1>

                <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}   >
                    {
                        data?.data?.data.map((item, index) => {
                            console.log(item)
                            return <div className="carousel-inner" role="listbox" key={index} >
                                <div className='carousel ' role="listbox" style={{ marginTop: "15px" }}>
                                    <img
                                        src={item?.photo?.data?.full_url}
                                        style={{ height: "250px", width: "100%", border: "1px solid #ccc" }}
                                        alt="sorry_no_img"
                                    />
                                    <h4 className="p-0 py-3 m-0 text-[white]"
                                        style={{ border: "1px solid #ccc" }}>{item.name}
                                        <br />
                                        <h4>{item.percent}%</h4>
                                    </h4>


                                </div>
                            </div>
                        })
                        ||
                        slides.map((slide, index) => {
                            return <div className="carousel-inner" role="listbox" key={index} >
                                <div className='carousel ' role="listbox" style={{ marginTop: "15px" }}>
                                    <img
                                        src={slide.title}
                                        style={{ height: "250px", width: "100%" }}
                                        alt="sorry_no_img"
                                    />
                                    <h4 className="p-0 py-3 m-0" style={{ border: "1px solid #ccc" }}>{slide.description}</h4>
                                </div>
                            </div>
                        })
                    }

                </Carousel>


            </div>
        </div>
    )
}

export default HomeEvents
