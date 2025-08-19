import React, { useState, useEffect } from 'react'
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const PrincipalMessage = ({ data_header, principle_data }) => {






  return (
    <Layout header_data={data_header}>
      <div className="lg:mt-[60px]">
      <img className="w-full" src="/images/upper.png" />
        <div className="grid gap-10 mx-10 sm:grid-cols-3 ">
          <div className="flex justify-center text-center ">
            <div className=" sm:h-8/12 sm:w-8/12 sm:mt-10" >
              {" "}
              <img
                className="shadow-2xl rounded-2 shadow1  "
                src={principle_data?.data?.length > 0 ? principle_data?.data[0]?.photo?.data?.full_url?.replace('http://', 'https://') : "/images/demo2.jpg"}
                // src="https://rosemarydn.com/images/principle.png"
                style={{ width: "100%", height: "300px" }}
                alt="Card image cap"
              />
              <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
                <h3 className="text-xl font-medium text-center text-white ">
                  {principle_data?.data ? principle_data?.data[0]?.full_name : "Demo Name"}
                  {/* Mrs. Meenakshi Bhadoria */}
                </h3>
              </div>
            </div>
          </div>




          <div className="sm:col-span-2 sm:mx-10 ">
            <h5 className="text-2xl font-medium text-center">
              {principle_data?.data?.length > 0 ? principle_data?.data[0]?.message : " PRINCIPALs'S MESSAGE :"}
              {/* Principal Message */}
            </h5>
            <p className="text-base font-normal sm:mr-5 sm:pr-5">
              {principle_data?.data?.length > 0 ? principle_data?.data[0]?.description : `In India Bhopal we see the beauty in variety and are proud to embrace methods that
                                respect and nurture individual talents and aspirations. Our innovative methodology of education facilitates natural
                                learning process rather than factory style education. india bhopal implements child centred
                                pedagogy besides aiming to raise its bar in all spheres. In fact, it dovetails the traditional and successful teaching
                                practices with modern trends to inspire a generation that seeks variations.
                                A good school education must help to spot the talent early on and guide the student to make full use of it.
                                india bhopal has bench marked itself as an institution par excellence which is fully geared to
                                nurture students and enable them to meet the specific needs of the future. The increasingly dynamic world has forced
                                traditional pedagogy to adapt the latest technologies in teachings. We are quite sensitive to this, for we believe that only
                                those who are ready to change will be able to survive and succeed. However, we must ensure that while we keep pace
                                with the changes, our cultural roots are not forgotten.
                                We at india bhopal recognise the crucial importance of quality education in the early years as
                                one third of life's chances come from the environment and experiences of first six years of the life.
                                chool Our young minds that are in need of positive reinforcement are provided with the required guidance and favourable
                                conditions so that they may be able to face global issues and offer solutions.
                                The innovative approach and matchless infrastructure of india bhopal, helps the students
                                reach their fullest academic, physical and spiritual potential. The school empowers them to face challenges of the future

`}

            </p>
          </div>
        </div>
        <img className="w-full" src="/images/lower.png" />
      </div></Layout>
  );

}

export default PrincipalMessage;



export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  let principle_data

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/faculty?status=published&fields=*.*`)

    principle_data = await response.json()
  }
  catch (error) {
    principle_data = false
  }

  return {
    props: { data_header, principle_data },
    revalidate: 1, // will be passed to the page component as props
  }
}
