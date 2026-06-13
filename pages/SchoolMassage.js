import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";

import { base_url, school_name } from "../SimpleState/auth";

const SchoolMassage = ({ header_data }) => {
  const [tabsData, setTabsData] = useState([]);

  const get_base_url = base_url.use();
  const get_school_name = school_name.use();

  useEffect(() => {
    axios
      .get(
        `${get_base_url}/${get_school_name}/items/tabs?fields=title,heading,body,images.directus_files_id.data.full_url`
      )
      .then((response) => {
        if (response?.data?.data?.length > 0) {
          // Only 3 tabs
          setTabsData(response.data.data.slice(0, 3));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* TAB SECTION */}
      <div className="bg-[#e9e1e1] py-10 px-3 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Tabs>

            {/* TAB BUTTONS */}
            <div className="flex justify-center">
              <TabList className="flex flex-wrap gap-3 border-none">

                {tabsData.map((item, i) => (
                  <Tab
                    key={i}
                    className="list-none outline-none"
                    selectedClassName="!bg-red-600"
                  >
                    <button
                      className="
                        min-w-[180px]
                        md:min-w-[260px]
                        py-5
                        px-6
                        text-white
                        font-bold
                        text-lg
                        uppercase
                        bg-[#4a5d80]
                        hover:bg-[#121e33]
                        transition-all
                        duration-300
                        border-none
                        outline-none
                      "
                    >
                      {item?.title}
                    </button>
                  </Tab>
                ))}

              </TabList>
            </div>

            {/* TAB CONTENT */}
            {tabsData.map((items, i) => (
              <TabPanel key={i}>
                <div className="bg-[#666363] p-5 md:p-12 mt-2">

                  {/* WIDER CONTAINER */}
                  <div className="bg-[#efefef] p-6 md:p-12 flex flex-col md:flex-row gap-10 items-start max-w-7xl mx-auto w-full">

                    {/* LEFT CONTENT */}
                    <div className="w-full md:w-9/12">

                      <div className="bg-gradient-to-r from-pink-600 to-gray-600 text-white px-4 py-3 mb-5">
                        <h3 className="text-2xl md:text-4xl font-medium">
                          {items?.heading}
                        </h3>
                      </div>

                      <p className="text-gray-700 leading-9 text-[17px] text-justify">
                        {items?.body}
                      </p>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="w-full md:w-3/12 flex justify-center">

                      {items?.images?.[0]?.directus_files_id?.data?.full_url && (
                        <img
                          src={items.images[0].directus_files_id.data.full_url.replace("http://", "https://")}
                          alt="tab-image"
                          className="w-full max-w-[320px] rounded-md shadow-xl border-4 border-white"
                        />
                      )}
                    </div>

                  </div>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>

      {/* KEEP THIS SECTION SAME */}
      <div className="flex flex-row justify-center text-center text-black no-underline bg-[#81cef1] ">
        <div
          className="m-3 border-white border-solid border-1 md:my-7 md:mx-8 px-10"
          style={{ border: "1px solid white" }}
        >
          <a className="" href="Contactus">
            <img
              className=" h-[70px] "
              src="/images/tc.png"
              alt="slide1"
            />
          </a>
          ContactUs
        </div>

        <div
          className="m-3 border-white border-solid md:my-7 md:mx-8 border-1 px-10 py-1"
          style={{ border: "1px solid white" }}
        >
          <a className="" href="Gallery">
            <img
              className="h-[70px]"
              src="/images/photo.png"
              alt="slide1"
            />
          </a>
          Photo-Gallery
        </div>
      </div>
    </div>
  );
};

export default SchoolMassage;