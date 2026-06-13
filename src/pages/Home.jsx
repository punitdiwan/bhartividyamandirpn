import React, { Suspense, lazy } from 'react'
import useSWR from 'swr'
import Layout from '../Component/Layout'
import SchoolMassage from './SchoolMassage'
import AdmissionBanner from './AdmissionBanner'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = url => fetch(url).then(r => r.json())

const HomeEvents = lazy(() => import('./HomeEvents'))
const Slider = lazy(() => import('./Slider'))
const GalleryFacebookSection = lazy(() => import('./GalleryFacebookSection'))

export default function Home() {
  const header_data = useHeaderData()

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL
  const { data: slider_data } = useSWR(
    `${baseUrl}/${school}/items/slider?status=published&fields=*.*.*`,
    fetcher
  )

  return (
    <div>
      <Layout header_data={header_data}>
        <Suspense fallback={null}>
          <Slider slider_data={slider_data} />
        </Suspense>
        <AdmissionBanner />
        <SchoolMassage header_data={header_data} />
        <Suspense fallback={null}>
          <GalleryFacebookSection header_data={header_data} />
        </Suspense>
        <Suspense fallback={null}>
          <HomeEvents />
        </Suspense>
      </Layout>
    </div>
  )
}
