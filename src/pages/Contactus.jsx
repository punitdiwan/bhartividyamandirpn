import React from "react";
import Layout from '../Component/Layout'
import { useHeaderData } from "../hooks/useHeaderData";

const Contactus = () => {
  const header_data = useHeaderData()


  return (
    <Layout header_data={header_data}>
      <div className="flex flex-col mb-10 lg:mx-28 pt-20">
        <div className="bg-[#e8ecef]   md:mx-4  text-base rounded-xl flex p-[70px] align-middle justify-center">
          <h1 className="text-6xl font-bold">Contact us</h1>
        </div>

        <div className="mt-[15px] lg:mx-16 px-6 flex md:flex-row flex-col gap-10">
          {/* Left Section */}
          <div>
            <iframe
              className="md:w-[600px] md:h-[450px] w-full h-[350px] rounded-lg"
              // src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d58646.191002103806!2d77.435538!3d23.265386!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c69d068d21741%3A0x365ce742c770ee90!2sSemra%20Kalan%2C%20Shanker%20Garden%2C%20Subhash%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh%20462010%2C%20India!5e0!3m2!1sen!2sus!4v1635161005508!5m2!1sen!2sus"
              src={header_data?.data?.[0]?.map}
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>


          </div>

          <div className="md:px-[40px] px-10 mt-4">
            <legend className="text-[#212529] font-normal leading-relaxed text-base md:w-[350px]">
              School:
            </legend>

            <hr className="md:w-[350px]" />

            <strong>Address.</strong>

            <address className="md:w-[350px] text-black">
              {header_data?.data
                ? header_data?.data[0]?.address
                : "Maitretech School Bhopal"}
            </address>

            <strong>Email:</strong>

            <address className="text-black">
              {header_data?.data
                ? header_data?.data[0]?.email
                : "maitretech@example.com"}
            </address>

            <strong>Mobile No:</strong>

            <address className="text-black">
              {header_data?.data
                ? header_data?.data[0]?.mobile
                : "+91 XXXXXXXXXX"}
            </address>

            <strong>Telephone No:</strong>

            <address className="text-black">
              {header_data?.data
                ? header_data?.data[0]?.phone
                : "+91 XXXXXXXXXX"}
            </address>
          </div>
          {/* Reusable Contact Form */}
          {/* <AdmissionForm /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Contactus;


