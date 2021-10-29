import React, { useState, useEffect } from 'react'
import Layout from '../Component/Layout'
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios'

const ManagementDesk = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()

  console.log(get_base_url)
  console.log(get_school_name)

  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/faculty?status=published&fields=*.*`)
      .then((response) => {
        response?.data?.data.map((data, i) => {
          if (i === 2) {
            setdata(data)
          }
        })
      })
      .catch((error) => {
        console.log(error);
      })


  }, [])


  return (
    <Layout header_data={data_header}>
      <div className="">
        <img
          className="w-full "
          src="https://rosemarydn.com/images/upper.png"
        />

        <div className="grid gap-10 mx-10 sm:grid-cols-3 ">
          <div className="flex justify-center text-center "><div className=" sm:h-8/12 sm:w-8/12 md:mt-10" >
            {" "}
            <img
              className="shadow-2xl rounded-2  shadow1 "
              src={data?.photo?.data?.full_url  }
              // src="https://rosemarydn.com/images/skmishra.JPG"
              alt="Card image cap"
              style={{ width: "100%", height: "300px" }}
            />
            <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
              <h3 className="text-xl font-medium text-center text-white ">
                {data.full_name || "Demo Name"}
                {/* SK Mishra */}
              </h3>
            </div>
          </div>
          </div>

          <div className="sm:col-span-2 sm:mx-10 ">
            <h5 className="text-2xl font-medium text-center">
              {data.message || "WORD FROM CHAIRMAN :"}
              {/* Management Message */}
            </h5>
            <p className="pb-0 mb-0 text-base font-normal sm:mr-5 sm:pr-5">
              {data.description || `Education should bring out the perfection which is already present in each
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
              {/* We choose to serve the society under the dynamic leadership of
              eminent people & scholars In today’s world, we need people who are
              seeker of knowledge and wisdom. Today children need to start off
              early to match steps with others in society but they need pace for
              their development. The teachers and parents face the challenge of
              teaching their children to the needs of the day. It is possible by
              learning to know; learning to do; learning to be authentic and
              learning to live together.
              
              We at Rose mary group provides the best of the modern and the
              traditional education to prepare every child to become a genuine
              world citizen. We aim to inculcate ethical and moral values in a
              child.
            
              It is my firm belief that a child’s mind is a universe full of
              possibilities. It needs the right environment to develop to its
              maximum potential at school and at home. As the saying goes, “A
              Child’s mind is like a dry sponge, ready to soak; all you need to
              do is to take it to the water.” All the students, alumni, wards
              and well-wishers are welcome to not just browse through what we
              post on this site but hope that they shall be a part of this
              pursuit, intellectually and technically, to the best of their
              knowledge. */}
            </p>
          </div>
        </div>
        <img className="w-full" src="https://rosemarydn.com/images/under.png" />
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
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
