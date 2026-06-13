import React, { useState } from 'react'
import useSWR from 'swr'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = url => fetch(url).then(r => r.json())



const Gallery = () => {
  const header_data = useHeaderData()
  const [index, setIndex] = useState(-1)

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: gallery_data } = useSWR(
    `${baseUrl}/${school}/items/gallery?fields=*.*.*`,
    fetcher
  )

  if (!gallery_data) {
    return (
      <Layout header_data={header_data}>
        <div className="container-fluid min-h-screen flex items-center justify-center bg-[#0066cc]">
          <div className="text-white text-2xl animate-pulse">Loading Gallery...</div>
        </div>
      </Layout>
    )
  }

  // Only keep items that actually have a photo
  const validGalleryItems =
    gallery_data?.data?.filter(
      item => item?.photo?.data?.full_url
    ) || []

  const hasGallery = validGalleryItems.length > 0

  if (!hasGallery) {
    return (
      <Layout header_data={header_data}>
        <div className="container-fluid min-h-screen flex items-center justify-center bg-[#0066cc]">
          <div className="text-white text-2xl">No Gallery Images Available</div>
        </div>
      </Layout>
    )
  }

  const lightboxSlides = validGalleryItems.map(item => ({
    src: item.photo.data.full_url.replace('http://', 'https://'),
  }))

  return (
    <Layout header_data={header_data}>
      <div className="container-fluid">
        <div className="md:grid p-5 md:grid-cols-5 sm:grid pt-20 sm:grid-cols-2 bg-[#0066cc]">
          {validGalleryItems.map((item, i) => (
            <div
              key={i}
              className="p-2 cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <img
                src={item.photo.data.full_url.replace('http://', 'https://')}
                className="w-full h-[200px] rounded-lg object-fill"
                alt="gallery"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={lightboxSlides}
      />
    </Layout>
  )
}

export default Gallery

