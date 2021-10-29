import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const AboutUs = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()
  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/tabs?fields=title,heading,body,images.directus_files_id.data.full_url`)
      .then((response) => {


        if (response?.data?.data?.length > 0) {
          console.log(response.data);
          setdata(response.data.data[0])
          // response?.data?.data[0].map((data1,i)=>{
          //     setdata(data1) 
          //     console.log(data1);
          // })
          //   setdata(response) 
        }

      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  return (
    <Layout header_data={data_header}>
      <div
        className="mx-3 "
      >
        <img
          className="w-full "
          src="https://rosemarydn.com/images/upper.png"
        />
        <div className="leading-[ 22.5px] font-normal">
          <h5 className="text-center">
            {data?.heading || "About School"}
            {/* About us */}

          </h5>
          <p className="mb-0">
             
          Bharti Vidya Mandir School is one of the oldest schools for both girls and boys managed by Bharti Vidya Mandir Group. Bharti Vidya Mandir Group is run by Mr Devendra Singh Ji. Our institution is recogniged by the Madhya Pradesh Board of education.We, Bharti Vidya Mandir School, understand that each child is a distinct individual who needs to be nurtured in order to grow into a mature and responsible citizen. Our academic infrastructure along with a wide range of co-curricular activities help our students in the all round personality development. We have a strong team of motivated teachers who are always ready to accept challenges of developing the potential of each and every student. Keeping in view the ideas of democracy and our ancient culture, Bharti Vidya Mandir strives to provide a system of education most suited to the needs of our society today. Stress on innovative methods of teaching , opportunities for shouldering responsibilities during school life, constant participation in sports and co-curricular activities lend meaning to the school life. Thus, the end product is the harmonious, all round developed personality of our students poised on the threshold of life.
            
          </p>
        </div>
        <img
          className="w-full"
          src="https://rosemarydn.com/images/under.png"
        />
      </div>
    </Layout>
  );

}

export default AboutUs;


export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
