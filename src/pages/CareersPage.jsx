import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { useNavigate } from "react-router-dom";
import { useHeaderData } from "../hooks/useHeaderData";

const CareersPage = () => {
  const navigate = useNavigate();
  const header_data = useHeaderData();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const school = import.meta.env.VITE_SCHOOL;

  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareerOpenings();
  }, []);

  const fetchCareerOpenings = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/${school}/items/career_openings`
      );

      const data = await response.json();

      setOpenings(data.data || []);
    } catch (error) {
      console.error("Error fetching openings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout header_data={header_data}>
      <div className="pt-20 px-4 lg:px-20 pb-16">

        {/* Banner */}
        <div className="bg-[#eef4ff] rounded-3xl py-16 text-center mb-10">
          <h1 className="text-5xl font-bold text-[#0066cc]">
            Current Openings
          </h1>

          <p className="mt-4 text-gray-600 max-w-4xl mx-auto leading-8 px-4">
            Your Next Career Move Starts Here – Join a Hub of
            Innovation
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-10">
          <p className="leading-8 text-gray-700">
            We are seeking passionate educators and professionals
            who share our vision of empowering young minds in a
            digitally powered, child-centered learning environment.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20 text-lg font-medium">
            Loading openings...
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-3xl shadow-lg">
            <table className="w-full min-w-[1100px]">

              <thead className="bg-[#0066cc] text-white">
                <tr>
                  <th className="p-4 text-left">S.NO.</th>
                  <th className="p-4 text-left">Position</th>
                  <th className="p-4 text-left">
                    Qualification
                  </th>
                  <th className="p-4 text-left">
                    Required Skills
                  </th>
                  <th className="p-4 text-left">
                    Job Type
                  </th>
                  <th className="p-4 text-left">
                    Experience
                  </th>
                  <th className="p-4 text-left">
                    Apply
                  </th>
                </tr>
              </thead>

              <tbody>
                {openings.map((job, index) => (
                  <tr
                    key={job.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4 font-medium">
                      {job.position}
                    </td>

                    <td className="p-4">
                      {job.qualification}
                    </td>

                    <td className="p-4">
                      {job.skills}
                    </td>

                    <td className="p-4">
                      {job.job_type}
                    </td>

                    <td className="p-4">
                      {job.experience}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          navigate("/careers/apply", {
                            state: {
                              position: job.position,
                            },
                          })
                        }
                        className="bg-[#0066cc] text-white px-5 py-2 rounded-xl hover:bg-[#0055aa] transition"
                      >
                        Apply Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CareersPage;