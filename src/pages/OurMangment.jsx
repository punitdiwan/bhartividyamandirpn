import React from 'react'
import useSWR from 'swr'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = url => fetch(url).then(r => r.json())

const OurManagement = () => {
  const header_data = useHeaderData()

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL
  const { data: chairman_data } = useSWR(
    `${baseUrl}/${school}/items/faculty?status=published&fields=*.*`,
    fetcher
  )

  if (!chairman_data) {
    return (
      <Layout header_data={header_data}>
        <div className="lg:mt-[60px] min-h-screen flex items-center justify-center">
          <div className="text-gray-500 text-xl animate-pulse">Loading...</div>
        </div>
      </Layout>
    )
  }

  const person = chairman_data?.data?.[2]

  return (
    <Layout header_data={header_data}>
      <div className="lg:mt-[60px]">
        <img className="w-full" src="/images/upper.png" />

        <div className="grid gap-10 mx-10 sm:grid-cols-3">
          <div className="flex justify-center text-center">
            <div className="sm:h-8/12 sm:w-8/12 md:mt-10">
              <img
                className="shadow-2xl rounded-2 shadow1"
                src={person?.photo?.data?.full_url?.replace('http://', 'https://')}
                alt="Card image cap"
                style={{ width: '100%', height: '300px' }}
              />
              <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
                <h3 className="text-xl font-medium text-center text-white ">
                  {person?.full_name}
                </h3>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 sm:mx-10">
            <h5 className="text-2xl font-medium text-center">
              {person?.message}
            </h5>
            <p className="pb-0 mb-0 text-base font-normal sm:mr-5 sm:pr-5 text-justify">
              {person?.description}
            </p>
          </div>
        </div>

        <img className="w-full" src="/images/lower.png" />
      </div>
    </Layout>
  )
}

export default OurManagement
