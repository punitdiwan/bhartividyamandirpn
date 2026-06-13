import React from 'react'
import useSWR from 'swr'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Faculty = () => {
  const header_data = useHeaderData()

  const baseUrl = import.meta.env.VITE_BASE_URL
  const schoolName = import.meta.env.VITE_SCHOOL
  const { data, error } = useSWR(
    `${baseUrl}/${schoolName}/items/staff_faculty?fields=*.*.*`,
    fetcher
  )

  if (error) {
    return (
      <Layout header_data={header_data}>
        <div className="text-center py-10 text-red-500">Failed to load faculty data.</div>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout header_data={header_data}>
        <div className="text-center py-10">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout header_data={header_data}>
      <div className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Administrative Staff</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {data.data.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300">
                <img
                  src={item.photo?.data?.full_url?.replace('http://', 'https://')}
                  alt={item.full_name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.full_name}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="font-medium"></span> {item.subject}
                  </p>
                  <p className="text-gray-600">
                    {/* <span className="font-medium">Experience:</span> {item.experience} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Faculty
