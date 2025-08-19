import React, { useState, useEffect } from 'react'
import Layout from '../Component/Layout'
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios'

const ManagementDesk = ({ data_header,chairman_data }) => {

   


  return (
    <Layout header_data={data_header}>
      <div  className="lg:mt-[60px]">
      <img className="w-full" src="/images/upper.png" />

        <div className="grid gap-10 mx-10 sm:grid-cols-3 ">
          <div className="flex justify-center text-center ">
            <div className=" sm:h-8/12 sm:w-8/12 md:mt-10" >
            {" "}
            <img
              className="shadow-2xl rounded-2  shadow1 "
              src={chairman_data?.data?.length > 0? chairman_data?.data[2]?.photo?.data?.full_url?.replace('http://', 'https://') : "/images/demo1.jpg"}
              // src="https://rosemarydn.com/images/skmishra.JPG"
              alt="Card image cap"
              style={{ width: "100%", height: "300px" }}
            />
            <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
              <h3 className="text-xl font-medium text-center text-white ">
              {chairman_data?.data?.length > 0? chairman_data?.data[2]?.full_name : "Demo Name"}
                {/* SK Mishra */}
              </h3>
            </div>
          </div>
          </div>

          <div className="sm:col-span-2 sm:mx-10 ">
            <h5 className="text-2xl font-medium text-center">
            {chairman_data?.data?.length > 0? chairman_data?.data[2]?.message : "WORD FROM CHAIRMAN :"}
              {/* Management Message */}
            </h5>
            <p className="pb-0 mb-0 text-base font-normal sm:mr-5 sm:pr-5">
            {chairman_data?.data?.length > 0? chairman_data?.data[2]?.description : `Education should bring out the perfection which is already present in each
                                    child. An institution should provide an environment which helps the child in
                                    achieving this perfection. It should help him develop his inherent qualities
                                    and all the aspects of his personality. This can be achieved when those
                                    involved in this process realize that education is much more than cramming
                                    a lot of information and passing examinations based on rote learning.
                                    Bhopal Public School Proposes to provide such an
                                    environment to the children. envisages looking for and orientating
                                    suitable personnel who would undertake this important task. It is hoped that
                                    the faculty so committed will achieve this objective. I assure you on behalf
                                    of the school to give civilized, knowledgeable and outstanding souls back to
                                    the society, on receiving them as an innocent and tender minds.
                                    Bhopal Public School Proposes to provide such an
                                    environment to the children. envisages looking for and orientating
                                    suitable personnel who would undertake this important task. It is hoped that
                                    the faculty so committed will achieve this objective. I assure you on behalf
                                    of the school to give civilized, knowledgeable and outstanding souls back to
                                    the society, on receiving them as an innocent and tender minds.`}
               
            </p>
          </div>
        </div>
        <img className="w-full" src="/images/lower.png" />
      </div></Layout>
  );

}

export default ManagementDesk;



export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  let chairman_data
  try {
      const response1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/faculty?status=published&fields=*.*`)

      chairman_data = await response1.json()
  }
  catch (error) {
      chairman_data = false
  }

  return {
      props: { data_header, chairman_data },
      revalidate: 1, // will be passed to the page component as props
  }
}
