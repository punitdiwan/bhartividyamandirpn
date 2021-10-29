import { SRLWrapper } from "simple-react-lightbox";
import Layout from '../Component/Layout';
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';

const Gallery = ({data_header}) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()  

  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/gallery?fields=*.*.*`)
      .then((response) => {


        if (response?.data?.data?.length > 0) {
          setdata(response) 
        }
         
      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  
  const slides = [
    { title: "/images/glr1.jpg ", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: " /images/glr3.jpg", description: 'View Gallery' },
    { title: "/images/glr2.jpg ", description: 'View Gallery' },
    { title: "/images/glr3.jpg ", description: 'View Gallery' },
    { title: " /images/glr1.jpg", description: 'View Gallery' },
  ];
  

  // const slides = [
  //   { title: "https://rosemarydn.com/gallery/user_images/684453.jpg", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/861147.jpg ", description: 'View Gallery' },
  //   { title: " https://rosemarydn.com/gallery/user_images/586195.jpg ", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/254997.jpg", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/37961.jpg", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/740720.jpg ", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/684453.jpg", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/861147.jpg ", description: 'View Gallery' },
  //   { title: " https://rosemarydn.com/gallery/user_images/586195.jpg ", description: 'View Gallery' },
  //   { title: "https://rosemarydn.com/gallery/user_images/254997.jpg", description: 'View Gallery' },
     

  // ];


  return (
    <Layout  header_data={data_header}>
      <SRLWrapper  >
        <div className="container-fluid ">
          <div className="  md:grid p-5  md:grid-cols-6 sm:grid pt-20 sm:grid-cols-2   bg-[#0066cc]">
            {data?.data?.data.map((item, i) => {
                console.log(item)
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
              ||
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



      {/* <div className="flex flex-col    bg-[#0066cc]" >
        <div className="flex flex-col md:flex-row justify-evently ">
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/684453.jpg" alt="gallery11"></img>
          <img className="md:w-[15vw]  h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/861147.jpg" alt="gallery12"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/586195.jpg" alt="gallery13"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/254997.jpg" alt="gallery14"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/37961.jpg" alt="gallery15"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/740720.jpg" alt="gallery16"></img>
        </div>
        <div className="flex flex-col md:flex-row justify-evently ">
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/61289.jpg" alt="gallery21"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/553266.jpg" alt="gallery22"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/574337.jpg" alt="gallery23"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/268316.jpg" alt="gallery24"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/620560.jpg" alt="gallery25"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/227370.jpg" alt="gallery26"></img>
        </div>
        <div className="flex flex-col md:flex-row justify-evently">
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/131203.jpg" alt="gallery31"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/412045.jpg" alt="gallery32"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/803407.jpg" alt="gallery33"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/307041.jpg" alt="gallery34"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/467990.jpg" alt="gallery35"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/141745.jpg" alt="gallery36"></img>
        </div>
        <div className="flex flex-col md:flex-row justify-evently ">
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/424648.jpg" alt="gallery41"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/517274.jpg" alt="gallery42"></img>
          <img className="md:w-[15vw] h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/images/3.jpg" ></img>
          <img className="md:w-[15vw]  h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/574337.jpg" ></img>
          <img className="md:w-[15vw]  h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/images/2.jpg" ></img>
          <img className="md:w-[15vw]  h-[200px]   m-[10px] rounded-lg" src="https://rosemarydn.com/gallery/user_images/861147.jpg"></img>
        </div>
      </div> */}
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
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}


