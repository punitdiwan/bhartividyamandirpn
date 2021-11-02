import React, { Component } from "react";
import Layout from "../Component/Layout";

const Facilities =({ data_header })=>  {
    return (
    <Layout header_data={data_header} >
      <div className="w-full h-full pl-5   bg-no-repeat bg-cover bg-Admission pt-16 ">
          <div className="w-10/12 pt-5 pb-5 font-serif mx:10 sm:mx-16">
            <h2 className="!text-3xl flex pt-2 font-serif text-[#009043] bg-yellow-50 pl-3  h-[60px] ">
              Facilities
            </h2>
          </div>

        <div className="w-10/12 pb-5 mx:10 sm:mx-20 !mt-5 !md:mt-10">
          <h2 className="!text-3xl flex flex-row text-[#164e30]  w-10/12">
            Lab
            <img src="/images/star.gif  " />
          </h2>
          <p>
            The facilities offered to the students include will equipped.
            science laboratories well stacked.
          </p>
          <h2 className="text-[#164e30] !text-3xl mt-2 flex flex-row  w-10/12">
            Yoga <img src="/images/star.gif  " />
          </h2>
          <p>
            Yoga musicroom and the meditation room a spacious multi purpose hall
            and facility of smart classes and we teach the students with the
            help of projects and computer.
          </p>
          <h2 className="text-[#164e30]  flex flex-row mt-2 !text-3xl w-10/12">
            Science Lab
            <img src="/images/star.gif  " />
          </h2>
          <p>
            The school has well equipped Biology, Physics and Chemistry labs
            where regular practicals are held.
          </p>
          <h2 className="text-[#164e30] flex flex-row  mt-2 w-10/12 !text-3xl">
            Biology Lab
            <img src="/images/star.gif  " />
          </h2>
          <p>
            Practical work plays an important role in understanding the basic
            principles of science. Biology is an interesting field of science
            where scientific facts are better understood by performing
            practicals in a systematic way. Biology laboratory of Rose Mary Hr.
            Sec. School is well furnished & is catering to the doing & learning
            part of science. Children are testing and verifying the scientific
            facts wonderfully well in the lab. Our Bio Lab is well equipped with
            Equipments Chemicals As instructed by the CBSE every care is taken
            that each experiment is conducted in a well structured way. (As
            prescribed by CBSE) Objectives Materials required Basic concepts
            Procedure Observations Calculations Inference Precautions
            Investigatory projects are done exceptionally well under the full
            guidance & scrutiny the Faculty members.
          </p>
          <h2 className="text-[#164e30] flex flex-row mt-2 w-10/12 !text-3xl">
            Chemistry Lab
            <img src="/images/star.gif  " />
          </h2>
          <p>
            The chemistry lab in Rose Mary Hr. Sec. School is well equipped with
            chemicals & glass wares. We use demonstration Technique which is
            capable of showing each & every aspect of chemistry practical. The
            proper guidance of the concern teacher of availability of all the
            materials to the student makes it easier & comfortable for the
            students. Our lab can occupy 40 students at time. The handling of
            apparatus & chemical improve the presition and analytical power of
            students. By using all the apparatus students develop a confidence
            in them and they can understand the subject well.
          </p>
          <h2 className="text-[#164e30] flex flex-row mt-2 w-10/12 !text-3xl">
            Physics Lab
            <img src="/images/star.gif  " />
          </h2>
          <p>
            Physics is such an interesting subject that every student has his
            own way of talking about. Many of the ideas in Physics are lost
            sight of, because many of them concentrate mostly on the theoretical
            aspects of the subject. Physics laboratory of Rose Mary Hr. Sec.
            School is well equipped according to the CBSE norms. The lab can
            easily accommodate 60 students at a time during the conduction of
            practical. The practicals that are conducted in the lab are exactly
            in accordance with the CBSE curriculum. During the conduction of the
            practical. We take utmost care in the following areas, i.e. -
            Student must learn to ask questions Why, How and How do we know it.
            As to give answers to these practicals are conducted.
          </p>
          <h2 className="text-[#164e30] flex flex-row  mt-2 w-10/12 !text-3xl">
            Computer Lab <img src="/images/star.gif  " />
          </h2>
          <p>
            We have two full fledged computer labs one for primary and the other
            for higher section with Internet facility where every student in the
            assigned period gets a computer to work with.
          </p>
          <h2 className="text-[#164e30] flex flex-row mt-2  w-10/12 !text-3xl">
            Indoor / Out Door Sports
            <img src="/images/star.gif  " />
          </h2>
          <p className="mb-10">
            Extensive and well maintained play fields of football and cricket
            and courts for volleyball, basketball, kabaddl, throwball and
            badminton me available to students. Indoor facilities of chess,
            caroms, table tennis etc. are also available.
          </p>
        </div>
      </div></Layout>
    );
   
}

export default Facilities;



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