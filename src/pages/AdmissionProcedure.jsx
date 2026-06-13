import React from 'react'
import useSWR from 'swr'

import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'
// import { fetcher } from '../utils/fetcher'

const AdmissionProcedure = () => {
  const header_data = useHeaderData()
  const fetcher = url => fetch(url).then(r => r.json())

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: uniform_data } = useSWR(
    `${baseUrl}/${school}/items/uniform?fields=*.*.*`,
    fetcher
  )
  console.log("uniform_data", uniform_data?.data?.[0]?.photo?.data?.full_url?.replace('http://', 'https://'));

  const { data: exam_data } = useSWR(
    `${baseUrl}/${school}/items/exam_timetable?fields=*.*.*`,
    fetcher
  )

  const { data: fees_data } = useSWR(
    `${baseUrl}/${school}/items/fees_structure?fields=*.*.*`,
    fetcher
  )

  const { data: books_data } = useSWR(
    `${baseUrl}/${school}/items/book_list?fields=*.*.*`,
    fetcher
  )

  const { data: admissionData } = useSWR(
    `${baseUrl}/${school}/items/admission_procedure?fields=*.*.*`,
    fetcher
  )


  const renderTableSection = (title, data) => {
    return (
      <div className="mt-14">
        <h2 className="text-3xl font-bold text-center mb-8">
          {title}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  Title
                </th>
                <th className="border border-gray-300 px-4 py-3 text-left">
                  File
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.data?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-3">
                    {item.title}
                  </td>

                  <td className="border border-gray-300 px-4 py-3">
                    {Array.isArray(item.file) ? (
                      item.file.map((fileItem, fileIndex) => {
                        const fileUrl =
                          fileItem?.directus_files_id?.data?.full_url?.replace(
                            'http://',
                            'https://'
                          )

                        return (
                          <div key={fileIndex} className="mb-2">
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="text-blue-600 underline"
                            >
                              Download File {fileIndex + 1}
                            </a>
                          </div>
                        )
                      })
                    ) : item?.file?.data?.full_url ? (
                      <a
                        href={item.file.data.full_url.replace('http://', 'https://')}
                        target="_blank"
                        rel="noreferrer"
                        download
                        className="text-blue-600 underline"
                      >
                        Download File
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <Layout header_data={header_data}>
      <div className="w-full h-full bg-no-repeat bg-cover bg-Admission container-fluid mt-10">
        {admissionData?.data?.[0] ? (
          <>
            <h5 className="text-2xl font-medium text-center leading-2 pt-10">
              {admissionData.data[0].title || 'Rose Mary Hr. Sec. School:'}
            </h5>
            <div className="mt-3 ml-5 mr-2 px-4 md:px-28 pb-10">
              <div
                className="text-xl font-normal leading-2"
                dangerouslySetInnerHTML={{ __html: admissionData.data[0].description }}
              />
            </div>
          </>
        ) : (
          <>
            <h5 className="text-2xl font-medium text-center leading-2 pt-10">
              Rose Mary Hr. Sec. School:
            </h5>

            <div className="mt-3 ml-5 mr-2 px-4 md:px-28">
              <b className="text-xl font-bold leading-2">
                Registration
              </b>

              <p className="mb-0 text-xl font-normal leading-2">
                Parents are required to submit a non-refundable application form to the school.
              </p>

              <p className="mb-0 text-xl font-normal leading-2">
                Registered parents are invited to visit the campus to understand the Goenkan culture & ethos.
              </p>

              <p className="mb-9 text-xl font-normal leading-2 w-75">
                The mere act of Registration will not constitute a guaranteed admission,
                which is subject to interaction with Principal, Aptitude test (grade V & above)
                and the school rule book
              </p>

              <b className="text-xl font-bold leading-2 mt-10">
                Submission of Documents
              </b>

              <p className="text-xl font-normal leading-2 w-75">
                Following Registration, duly filled Application form needs to be submitted
                along with the documents listed below within 5 days of the registration date.
              </p>

              {[
                'Attested copy of Birth certificate',
                'Copy of Address proof',
                'TC from previous school (class II onwards)',
                '6 passport size photos of the child and 1 each of the parents',
                'Previous session report card for Nursery to class I or previous three session report cards (class II onwards), whichever applies.',
                'Vaccination card',
                'Blood group card or report',
                'Copy of Aadhar card',
                'Copy of Samagra ID',
                'Cheque Photocopy',
              ].map((item, i) => (
                <p
                  key={i}
                  className="mb-3 text-xl font-normal leading-2"
                >
                  <span className="text-red-500">★</span> {item}
                </p>
              ))}

              {/* BOOK LIST */}
              {/* {renderTableSection('Book List', books_data)} */}

              {/* EXAM TIMETABLE */}
              {/* {renderTableSection('Exam Timetable', exam_data)} */}

              {/* FEES STRUCTURE */}
              {/* {renderTableSection('Fees Structure', fees_data)} */}

              {/* UNIFORM SECTION */}
              {/* <div className="mt-14 mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Uniform
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {uniform_data?.data?.map((item, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-md"
                    >
                      <img
                        src={item?.photo?.data?.full_url?.replace('http://', 'https://')}
                        alt={item.title}
                        className="w-full h-72 object-cover"
                      />

                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-center">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default AdmissionProcedure
