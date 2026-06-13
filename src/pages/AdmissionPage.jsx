import React from "react";
import Layout from "../Component/Layout";
import { useHeaderData } from "../hooks/useHeaderData";
import AdmissionForm from "../Component/AdmissionForm";

const AdmissionPage = () => {
  const header_data = useHeaderData();

  return (
    <Layout header_data={header_data}>
      <div className="flex flex-col mb-16 lg:px-20 px-4 pt-20">

        {/* Banner */}
        <div className="bg-[#e8ecef] rounded-2xl flex items-center justify-center py-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
            Admission
          </h1>
        </div>

        {/* Main Content */}
        <div className="mt-10 flex flex-col lg:flex-row gap-10">

          {/* Left Section */}
          <div className="flex-1">

            {/* Menu */}
            {/* <div className="flex flex-wrap gap-4 mb-8">
              {[
                "Admissions",
                "Procedure",
                "Brochure",
                "Fee Structure",
                "Booklist",
                "Uniforms",
              ].map((item, index) => (
                <button
                  key={index}
                  className="px-5 py-2 rounded-full bg-[#0066cc] text-white hover:bg-[#0055aa] transition"
                >
                  {item}
                </button>
              ))}
            </div> */}

            {/* Admission Content */}
            <div className="bg-white shadow-md rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-[#0066cc]">
                Admissions
              </h2>

              <p className="text-gray-700 leading-8 mb-6">
                Parents desiring admission to The Sanskriti School,
                Bhopal, for different grade levels are kindly urged
                to either complete the online inquiry form or the
                offline registration form. Subsequently, they are
                encouraged to secure a time slot for their child’s
                interaction session.
              </p>

              <h3 className="text-xl font-semibold mb-4">
                Kindly Note:
              </h3>

              <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-7">
                <li>
                  For KG-1 registrations, the child should complete
                  an age of 3.6 years minimum on 31st March of the
                  academic session.
                </li>

                <li>
                  For classes KG-1, KG-2 and Grade 1, birth
                  certificate is mandatory.
                </li>

                <li>
                  Admission to Grade-2 and above will require a
                  Transfer Certificate from the previous school.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Form */}
          {/* Right Section - Form */}
          <div className="w-full lg:w-[600px]">
            <AdmissionForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdmissionPage;