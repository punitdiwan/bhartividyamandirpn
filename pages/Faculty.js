import React from 'react';
import useSWR from 'swr';
import Layout from "../Component/Layout";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Faculty(data_header) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const schoolName = process.env.NEXT_PUBLIC_SCHOOL;

    const url = `${baseUrl}/${schoolName}/items/staff_faculty?fields=*.*.*`;

    const { data, error } = useSWR(url, fetcher);

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                Failed to load faculty data.
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center py-10">
                Loading...
            </div>
        );
    }

    return (
        <Layout header_data={data_header}>
            <div className="w-full bg-white py-16">
                <div className="max-w-7xl mx-auto px-4">

                    {/* Heading */}
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        FACULTY
                    </h2>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                        {data.data.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
                            >

                                {/* Faculty Image */}
                                <img
                                    src={item.photo?.data?.full_url?.replace("http://", "https://")}
                                    alt={item.full_name}
                                    className="w-full h-72 object-cover"
                                />

                                {/* Content */}
                                <div className="p-5 text-center">

                                    {/* Name */}
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {item.full_name}
                                    </h3>

                                    {/* Subject */}
                                    <p className="text-gray-600 mb-2">
                                        <span className="font-medium">
                                            Subject:
                                        </span>{' '}
                                        {item.subject}
                                    </p>

                                    {/* Experience */}
                                    <p className="text-gray-600">
                                        <span className="font-medium">
                                            Experience:
                                        </span>{' '}
                                        {item.experience}
                                    </p>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Faculty;