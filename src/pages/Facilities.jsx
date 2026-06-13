import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const BASE_URL = import.meta.env.VITE_BASE_URL
const SCHOOL = import.meta.env.VITE_SCHOOL || 'technicaltesting'

const Facilities = () => {
  const header_data = useHeaderData()
  const [facilities, setFacilities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${SCHOOL}/items/facilities?fields=title,description,image.data.full_url`)
      .then(response => {
        setFacilities(response?.data?.data || [])
      })
      .catch(error => {
        console.log('Facilities fetch error:', error)
        setFacilities([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout header_data={header_data}>
      <div className="w-full h-full pl-5 bg-no-repeat bg-cover bg-Admission pt-16">
        <div className="w-10/12 pt-5 pb-5 mx:10 sm:mx-16">
          <h2 className="!text-3xl flex pt-2 font-serif text-[#009043] bg-yellow-50 pl-3 h-[60px]">
            Facilities
          </h2>
        </div>

        <div className="w-10/12 pb-10 mx:10 sm:mx-20 !mt-5 !md:mt-10 space-y-10">
          {loading ? (
            <div className="py-20 text-center text-white">Loading facilities...</div>
          ) : facilities.length === 0 ? (
            <div className="py-20 text-center text-white">No facilities available at the moment.</div>
          ) : (
            facilities.map((facility, index) => {
              const imageUrl = facility?.image?.data?.full_url?.replace('http://', 'https://')
              return (
                <div key={facility.id || index} className="flex flex-col md:flex-row items-center gap-6 bg-white/90 p-6 rounded-3xl shadow-xl">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={facility.title || 'Facility'}
                      className="w-full md:w-[420px] h-[250px] md:h-[250px] object-fill rounded-3xl"
                    />
                  )}
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-[#164e30] text-2xl md:text-3xl font-semibold mb-4">
                      {facility.title || 'Facility title'}
                    </h2>
                    <div
                      className="text-[#1f2937] leading-8"
                      dangerouslySetInnerHTML={{ __html: facility.description || '' }}
                    />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Facilities
