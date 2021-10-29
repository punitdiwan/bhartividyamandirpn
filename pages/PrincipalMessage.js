import React, { useState, useEffect } from 'react'
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios'; 
import Layout from "../Component/Layout";

const PrincipalMessage = ({data_header}) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()

  console.log(get_base_url)
  console.log(get_school_name)

  useEffect(() => {
      axios.get(`${get_base_url}/${get_school_name}/items/faculty?status=published&fields=*.*`)
          .then((response) => {
              response?.data?.data.map((data, i) => {
                  if (i === 0) {
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
              // src="https://rosemarydn.com/images/principle.png"
              style={{ width: "100%", height: "300px" }}
              alt="Card image cap"
            />
            <div className="bg-blue-600 h-[50px] flex items-center justify-center shadow1">
              <h3 className="text-xl font-medium text-center text-white ">
              {data.full_name || "Demo Name"}
                {/* Mrs. Meenakshi Bhadoria */}
              </h3>
            </div>
          </div>
          </div>



           
          <div className="sm:col-span-2 sm:mx-10 ">
            <h5 className="text-2xl font-medium text-center">
            {data.message || " PRINCIPAL'S MESSAGE :"}
              {/* Principal Message */}
            </h5>
            <p className="text-base font-normal sm:mr-5 sm:pr-5">
            {  data.description || `In India Bhopal we see the beauty in variety and are proud to embrace methods that
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
{/*               
              “ Life is journey ,the Path We take ,what fact’s govern us and
              what we look forward is up to us. It has indeed been a long
              journey.School is a abode of learning where children from
              different works of life come together to get education. Education
              is not learning by rote and then repeating it in the
              examination.For all parents education of their children is of
              greatest importance and selecting the right school is not an easy
              task Dear Parent’s, Rose Mary Hr. Sec. School Prime Concern is our
              Student’s career and we belive in Building Trust and hope by
              providing best Education. Our School continues to uphold
              traditional values while adopting contempory infrastructure and
              pedagogies. Our approach is student centred and goes beyond text
              books, Class rooms and boundaries. We have live multimedia
              presentation to facilitate deeper understanding of concepts. We
              inculcate in children, a respect for Indian culture. At the core
              of the schools educational philosophy, modern education and
              cultural heritage are complimentary and help the students to
              become better citizens. Our dedicated staff follows the principal
              of " explore, excercise and achieve" in their quest for
              excellence.Through out the year our effort has been to to educate,
              empower and enlighten. It is because of their selfless and
              relentless efforts that the school has reached majestic heights.
              We are very grateful to our staff ,co-worker and parents for their
              sincere involvement in the School. Without their single-minded
              co-operation between the school and home we cannot offer the
              holistic education towards which we are striving. “Don’t train a
              child to learn by force or harshness, but direct them by love and
              care “ Thank You */}
            </p>
          </div>
        </div>
        <img className="w-full" src="https://rosemarydn.com/images/under.png" />
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
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
