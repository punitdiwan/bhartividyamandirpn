import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const DirectorMessage = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()


  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/faculty?status=published&fields=*.*`)
      .then((response) => {
        response?.data?.data.map((data, i) => {
          if (i === 1) {
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



          <div className="flex justify-center text-center "><div className=" sm:h-8/12 sm:w-8/12 sm:mt-10" >
            {" "}
            <img
              className="shadow-2xl rounded-2 shadow1  "
              src={data?.photo?.data?.full_url }
              // src="https://rosemarydn.com/images/director.jpg"
              style={{ width: "100%", height: "300px" }}
              alt="Card image cap"
            />
            <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
              <h3 className="text-xl font-medium text-center text-white ">
                {data.full_name || "Demo Name"}
                {/* Mr. Devendra Singh */}
              </h3>
            </div>
          </div>
          </div>

          <div className="sm:col-span-2 sm:mx-10 ">
            <h5 className="text-2xl font-medium text-center">
            {  data.message }
              {/* Director Message */}
            </h5>
            <p className="text-base font-normal sm:mr-5 sm:pr-5">
              {data.description  }

              {/* Dear Parent & Students, It gives me great pleasure to welcome you
            to Rose mary School. The school is committed to inculcating in all
            our students; strong ethical valued of integrity, respect and
            discipline as well as clarity in thought and decision-making
            ability, as a life-long process. In order to achieve all this, We
            follow a rigorous programme that is based upon the best
            educational practices, highly progressive and recognized
            world-wide; and one that creates conditions for students to
            maximize their potential at an internationally competitive level.
            Our state-of-the-art infrastructure, coupled with highly qualified
            and well-trained teachers, ensures that the students at Rose Mary
            should be able to gain an enriching experience. Furthermore, it
            has been one of my quests in life to make high quality education
            available; accessible through the latest educational technology.
            The mission of the school is to develop responsible global
            citizens and leaders through academic excellence, We will be the
            foundation for a new generation of leaders and innovators, who
            will continue to pave the way for a better and brighter future for
            our world. The greatest strength of Rose Mary is the high quality
            programmes and transparency in its system. We are fortunate to
            have a school community which includes talented teachers and
            supportive parents who work together to make Rose Mary , an ideal
            place for our motivated students to learn and grow. We are always
            open to new ideas, inquiries and feedback, from all. Over the past
            26 years, Rose Mary has lived up to its mission statement and
            established itself as one of the top educational institutions for
            students and parents in Bhopal. I welcome you to be a part of Rose
            Mary family! */}
            </p>
          </div>
        </div>
        <img className="w-full" src="https://rosemarydn.com/images/under.png" />
      </div></Layout>
  );
}

export default DirectorMessage;



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
