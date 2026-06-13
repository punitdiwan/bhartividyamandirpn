import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const BASE_URL = import.meta.env.VITE_BASE_URL
const SCHOOL = import.meta.env.VITE_SCHOOL || 'technicaltesting'

const AboutUs = () => {
  const header_data = useHeaderData()
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${SCHOOL}/items/about_us?fields=title,description,image.data.full_url`)
      .then(response => {
        setAboutData(response?.data?.data?.[0] || null)
      })
      .catch(error => {
        console.log('About us fetch error:', error)
        setAboutData(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const imageUrl = aboutData?.image?.data?.full_url?.replace('http://', 'https://')

  const defaultDescription = `Rose Mary School is a Higher secondary school for both girls and boys managed by rose mary Group. Rose Mary Group was established in 1991 and run by Mr Devendra Singh Ji. Our institution is recogniged by the Madhya Pradesh Board of education.
            We, Rose Mary High School, understand that each child is a distinct individual who needs to be nurtured in order to grow into a mature and responsible citizen. Our academic infrastructure along with a wide range of co-curricular activities help our students in the all round personality development. We have a strong team of motivated teachers who are always ready to accept challenges of developing the potential of each and every student. Keeping in view the ideas of democracy and our ancient culture, Rose Mary High School strives to provide a system of education most suited to the needs of our society today. Stress on innovative methods of teaching, opportunities for shouldering responsibilities during school life, constant participation in sports and co-curricular activities lend meaning to the school life. Thus, the end product is the harmonious, all round developed personality of our students poised on the threshold of life.`

  return (
    <Layout header_data={header_data}>
      <div className="mx-3 mt-10">
        <img className="w-full" src="/images/upper.png" alt="About us top" />

        <div className="leading-[22.5px] font-normal py-10">
          {loading ? (
            <div className="py-20 text-center text-gray-700">Loading About Us content...</div>
          ) : (
            <>
              <h5 className="text-center text-3xl font-semibold mb-6">
                {aboutData?.title || 'About us'}
              </h5>

              {imageUrl && (
                <img
                  className="w-full h-80 object-contain rounded-xl mb-6"
                  src={imageUrl}
                  alt={aboutData?.title || 'About us image'}
                />
              )}

              <div
                className="mb-0 text-justify"
                dangerouslySetInnerHTML={{
                  __html: aboutData?.description || defaultDescription,
                }}
              />


            </>
          )}
        </div>

        <img className="w-full" src="/images/lower.png" alt="About us bottom" />
      </div>
    </Layout>
  )
}

export default AboutUs
