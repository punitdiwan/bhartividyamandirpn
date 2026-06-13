import React, { useState } from "react"
import useSWR from "swr"
import Layout from "../Component/Layout"
import { useHeaderData } from "../hooks/useHeaderData"

const Uniform = () => {
  const [selectedUniform, setSelectedUniform] = useState(null)
  const header_data = useHeaderData()
  const fetcher = url => fetch(url).then(r => r.json())

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data } = useSWR(
    `${baseUrl}/${school}/items/uniform?fields=*.*.*`,
    fetcher
  )

  return (
    <Layout header_data={header_data}>
      <div className="container mx-auto px-4 py-10">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          School Uniform
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          The school uniform represents discipline, equality, and identity.
          It helps create a sense of belonging and pride among students.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {data?.data?.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >

              {/* Image */}
              <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedUniform(item)}>
                <img
                  src={item?.photo?.data?.full_url?.replace("http://", "https://")}
                  alt={item.title}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  Official Uniform
                </span>
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>


                {/* Button style (optional action) */}
                {/* <button className="mt-4 px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition">
                  View Details
                </button> */}
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Modal for full image view */}
      {selectedUniform && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedUniform(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white rounded-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedUniform(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold z-10 transition"
            >
              ×
            </button>

            {/* Image */}
            <img
              src={selectedUniform?.photo?.data?.full_url?.replace("http://", "https://")}
              alt={selectedUniform.title}
              className="w-full max-h-96 object-contain"
            />

            {/* Title */}
            <div className="p-6 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">{selectedUniform.title}</h2>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Uniform