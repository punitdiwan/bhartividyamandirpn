import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../Component/Layout";
import { useHeaderData } from "../hooks/useHeaderData";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const SCHOOL = import.meta.env.VITE_SCHOOL || "technicaltesting";

const AboutUs = () => {
  const header_data = useHeaderData();

  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultDescription = `
    <p>
      Rose Mary School is a Higher Secondary School for both girls and boys managed by Rose Mary Group.
      Rose Mary Group was established in 1991 and is run by Mr. Devendra Singh Ji.
      Our institution is recognized by the Madhya Pradesh Board of Education.
    </p>

    <p class="mt-4">
      We, Rose Mary High School, understand that each child is a distinct individual
      who needs to be nurtured in order to grow into a mature and responsible citizen.
      Our academic infrastructure along with a wide range of co-curricular activities
      help our students in their all-round personality development.
    </p>

    <p class="mt-4">
      We have a strong team of motivated teachers who are always ready to accept
      challenges of developing the potential of each and every student.
      Keeping in view the ideas of democracy and our ancient culture,
      Rose Mary High School strives to provide a system of education most suited
      to the needs of our society today.
    </p>

    <p class="mt-4">
      Stress on innovative methods of teaching, opportunities for shouldering
      responsibilities during school life, constant participation in sports
      and co-curricular activities lend meaning to school life.
      Thus, the end product is the harmonious, all-round developed personality
      of our students poised on the threshold of life.
    </p>
  `;

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/${SCHOOL}/items/about_us?fields=*,image.data.full_url&limit=-1`
        );

        setAboutData(response?.data?.data || []);
      } catch (error) {
        console.error("About Us Fetch Error:", error);
        setAboutData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <Layout header_data={header_data}>
      <div className="mx-auto max-w-7xl px-4 py-10">

        {/* Top Image */}
        <img
          src="/images/upper.png"
          alt="Top Banner"
          className="w-full mb-10"
        />

        {loading ? (
          <div className="text-center py-20 text-xl font-semibold">
            Loading...
          </div>
        ) : (
          aboutData.map((item) => {
            const imageUrl = item?.image?.data?.full_url?.replace(
              "http://",
              "https://"
            );

            return (
              <div key={item.id} className="mb-20">

                {/* Title */}
                <h2 className="text-4xl font-bold text-center mb-10">
                  {item.title}
                </h2>

                {/* Image + Content */}
                {/* Description */}
                <div className="w-full">
                  <div
                    className="text-justify leading-8 text-[16px] text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: item.description || defaultDescription,
                    }}
                  />
                </div>

                {/* Image After Description */}
                <div className="w-full mt-8 flex justify-center">
                  <img
                    src={imageUrl || "/images/about.jpg"}
                    alt={item.title}
                    className="w-full max-w-4xl h-[420px] object-contain rounded-xl shadow-lg"
                  />
                </div>
              </div>
            );
          })
        )}

        {/* Bottom Image */}
        <img
          src="/images/lower.png"
          alt="Bottom Banner"
          className="w-full mt-10"
        />

      </div>
    </Layout>
  );
};

export default AboutUs;