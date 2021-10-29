import "tailwindcss/tailwind.css";
import Layout from "../Component/Layout";
import SchoolMassage from '../pages/SchoolMassage'
import Slider from '../pages/Slider'
import HomeEvents from '../pages/HomeEvents'
 

export default function Home({ data_header }) { 

  console.log(data_header)
  return (
    <div>
      <Layout header_data={data_header}>
        <Slider /> 
        
        <SchoolMassage  header_data={data_header}/>
        <HomeEvents/>
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
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}