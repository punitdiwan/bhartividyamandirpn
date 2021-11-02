import { SRLWrapper } from "simple-react-lightbox";
import Layout from '../Component/Layout';
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';

const Gallery = ({ data_header, gallery_data }) => { 
  const slides = [
    { title: "/images/glr1.jpg ", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: " /images/glr3.jpg", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: "/images/glr3.jpg ", description: 'View Gallery' },
    { title: " /images/glr1.jpg", description: 'View Gallery' },
  ];



  return (
    <Layout header_data={data_header }>
      <SRLWrapper  >
        <div className="container-fluid ">
          <div className="  md:grid p-5  md:grid-cols-5 sm:grid pt-20 sm:grid-cols-2   bg-[#0066cc]">
            {gallery_data?.data?.length > 0 ?
              gallery_data?.data.map((item, i) => {
                return (
                  <div key={i} className="p-2">
                    <img
                      src={item.photo.data.full_url}
                      className="w-full h-[200px]  rounded-lg"
                      alt="no_img"
                    />
                  </div>  
                );
              })
              :
              slides.map((item, i) => {
                return (
                  <div key={i} className="p-2">
                    <img
                      src={item?.title}
                      className="w-full h-[200px]  rounded-lg"
                      alt="no_img"
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </SRLWrapper>

    </Layout>
  );

}

export default Gallery;



export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }

  //////

  let gallery_data

  try {
    const response1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/gallery?fields=*.*.*`)

    gallery_data = await response1.json()
  }
  catch (error) {
    gallery_data = false
  }


  return {
    props: { data_header, gallery_data },
    revalidate: 1, // will be passed to the page component as props
  }
}

