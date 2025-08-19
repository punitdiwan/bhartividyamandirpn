import Layout from '../Component/Layout';
import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const Gallery = ({ data_header, gallery_data }) => {
  // Prepare slides data for lightbox
  const slides = gallery_data?.data?.length > 0
    ? gallery_data.data.map(item => ({
        src: item.photo.data.full_url?.replace('http://', 'https://'),
        // Optionally you can add title or description here
        title: 'View Gallery',
      }))
    : [
        { src: "/images/glr1.jpg", title: 'View Gallery' },
        { src: "/images/glr2.jpg", title: 'View Gallery' },
        { src: "/images/glr3.jpg", title: 'View Gallery' },
        { src: "/images/glr2.jpg", title: 'View Gallery' },
        { src: "/images/glr3.jpg", title: 'View Gallery' },
        { src: "/images/glr1.jpg", title: 'View Gallery' },
      ];

  // State to control open/close and which slide is active
  const [index, setIndex] = useState(-1);

  return (
    <Layout header_data={data_header}>
      <div className="container-fluid">
        <div className="md:grid p-5 md:grid-cols-5 sm:grid pt-20 sm:grid-cols-2 bg-[#0066cc]">
          {slides.map((slide, i) => (
            <div key={i} className="p-2 cursor-pointer" onClick={() => setIndex(i)}>
              <img
                src={slide.src}
                className="w-full h-[200px] rounded-lg"
                alt={slide.title || "Gallery Image"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox component */}
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </Layout>
  );
};

export default Gallery;

export async function getStaticProps(context) {
  let data_header;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`
    );
    data_header = await response.json();
  } catch (error) {
    data_header = false;
  }

  let gallery_data;
  try {
    const response1 = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/gallery?fields=*.*.*`
    );
    gallery_data = await response1.json();
  } catch (error) {
    gallery_data = false;
  }

  return {
    props: { data_header, gallery_data },
    revalidate: 1,
  };
}
