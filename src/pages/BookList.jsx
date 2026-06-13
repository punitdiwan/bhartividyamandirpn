import React from "react"
import useSWR from "swr"
import Layout from "../Component/Layout"
import { useHeaderData } from "../hooks/useHeaderData"

const BookList = () => {
  const header_data = useHeaderData()
  const fetcher = url => fetch(url).then(r => r.json())

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data } = useSWR(
    `${baseUrl}/${school}/items/book_list?fields=*.*.*`,
    fetcher
  )

  return (
    <Layout header_data={header_data}>
      <div className="container mx-auto px-4 py-10">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Book List
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          A comprehensive list of all books required for each grade level to ensure structured learning.
        </p>

        {/* Table Wrapper */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-100">

          <table className="w-full text-left">

            {/* Header */}
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                  Book Title
                </th>
                <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {data?.data?.map((item, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >

                  {/* Title */}
                  <td className="px-6 py-4 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {item.title}
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-center">

                    <a
                      href={item?.file?.data?.full_url?.replace("http://", "https://")}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
                    >
                      ⬇ Download
                    </a>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Click download to view or save the book list PDF.
        </p>

      </div>
    </Layout>
  )
}

export default BookList