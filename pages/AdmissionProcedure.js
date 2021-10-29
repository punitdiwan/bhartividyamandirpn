import React, { Component } from "react";
import Layout from "../Component/Layout";

const AdmissionProcedure = ({ data_header }) => {

      return (
            <Layout header_data={data_header}>
                  <div className="w-full h-full bg-no-repeat bg-cover bg-Admission container-fluid ">
                        <img
                              src="https://rosemarydn.com/images/ad_upper.JPG"
                              className="w-full md:h-auto h-52 "
                        />
                        <h5 className="text-2xl font-medium text-center leading-2 pt-5 ">Rose Mary Hr. Sec. School:</h5>
                        <div className="  mt-3 ml-5 mr-2 px-4 md:px-28 ">
                              <b className="text-xl font-bold leading-2">Registration</b>
                              <p className="mb-0 text-xl font-normal leading-2">
                                    Parents are required to submit a non-refundable application form to
                                    the school.
                              </p><p className="mb-0 text-xl font-normal leading-2"> Registered parents are invited to visit the campus to
                                    understand the Goenkan culture & ethos. </p>
                                    <p className=" mb-9 text-xl font-normal leading-2 w-75">The mere act of Registration
                                          will not constitute a guaranteed admission, which is subject to
                                          interaction with Principal, Aptitude test (grade V & above) and the
                                          school rule book

                              </p>
                              <b className="text-xl font-bold leading-2  mt-10 " > Submission of Documents</b>
                              <p className="text-xl font-normal leading-2 w-75">Following Registration, duly filled Application form needs to be submitted along with the documents listed below within 5 days of the registration date.</p>



                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Attested copy of Birth certificate

                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Copy of Address proof

                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    TC from previous school (class II onwards)

                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    6 passport size photos of the child and 1 each of the parents
                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Previous session report card for Nursery to class I or previous three session report cards (class II onwards), whichever applies.
                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Vaccination card
                              </p>

                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Blood group card or report
                              </p>


                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Copy of Aadhar card
                              </p>
                              <p className="mb-3 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Copy of Samagra ID
                              </p>
                              <p className="pb-4 mb-0 text-xl font-normal leading-2">
                                    <span className="text-red-500">★</span>
                                    Cheque Photocopy
                              </p>


                        </div>
                  </div>
            </Layout>
      );

}

export default AdmissionProcedure;



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
