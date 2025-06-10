import "tailwindcss/tailwind.css";
import Layout from "../Component/Layout";
import SchoolMassage from '../pages/SchoolMassage'
import Slider from '../pages/Slider'
import HomeEvents from '../pages/HomeEvents'
import ReactGA from "react-ga4";

ReactGA.initialize("G-XXXXXXXXXX");
export default function Home({ data_header, slider_data }) { 
  
  return (
    <div>
      <Layout header_data={data_header}>
        <Slider slider_data={slider_data} /> 
        <SchoolMassage header_data={data_header} />
        <HomeEvents />
      </Layout>
    </div>
  );
}


export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }

  let slider_data
  try {
    const response1 = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/slider?status=published&fields=caption,image.data.full_url`)

    slider_data = await response1.json()
  }
  catch (error) {
    slider_data = false
  }

  return {
    props: { data_header, slider_data },
    revalidate: 2, // will be passed to the page component as props
  }
}