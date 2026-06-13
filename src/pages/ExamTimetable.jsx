import React, { useState } from "react"
import useSWR from "swr"
import Layout from "../Component/Layout"
import { useHeaderData } from "../hooks/useHeaderData"
import { useTimetable } from "../hooks/useSchoolData"

const ExamTimetable = () => {
  const header_data = useHeaderData()

  const fetcher = (url) => fetch(url).then((r) => r.json())

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: cmsData } = useSWR(
    `${baseUrl}/${school}/items/exam_timetable?fields=*.*.*`,
    fetcher
  )

  const { data: erpData, loading: erpLoading } = useTimetable()
  const [selectedClass, setSelectedClass] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (cls) => {
    setSelectedClass(cls)
    setIsModalOpen(true)
  }

  return (
    <Layout header_data={header_data}>
      <div className="container mx-auto px-4 py-10">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Exam Timetable
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          The examination schedule helps students prepare in advance,
          manage their study time effectively, and stay organized throughout
          the academic session.
        </p>

        {/* CMS Table Card (Files) */}
        {cmsData?.data && cmsData.data.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100 mb-12">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                    Examination Schedule
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cmsData.data.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50 transition duration-200"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={item?.file?.data?.full_url?.replace("http://", "https://")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-300"
                      >
                        📄 Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ERP Timetable Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Current Exam Schedules ({erpData?.academic_year?.ay_name})</h2>

          {erpLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading exam schedules...</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wide">Class Name</th>
                    <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {erpData?.classes?.map((cls, idx) => (
                    <tr key={idx} className="border-b last:border-none hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-800">{cls.course_name}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleViewDetails(cls)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition"
                        >
                          View Timetable
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-10">
          Students are advised to regularly check the timetable for updates.
        </p>

      </div>

      {/* Modal */}
      {isModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-2xl font-bold text-gray-800">
                Exam Timetable: {selectedClass.course_name}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {selectedClass.batches?.map((batch, batchIdx) => (
                <div key={batchIdx} className="mb-12 last:mb-0">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-emerald-600 rounded-full"></div>
                    <h4 className="text-xl font-bold text-emerald-900 font-serif">Section: {batch.batch_name}</h4>
                  </div>

                  {batch.exam_groups?.map((group, groupIdx) => (
                    <div key={groupIdx} className="mb-8 last:mb-0">
                      <div className="bg-emerald-50 px-4 py-2 border-l-4 border-emerald-500 mb-4">
                        <h5 className="font-bold text-emerald-800 uppercase tracking-wider text-sm">Exam: {group.title}</h5>
                      </div>

                      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                        <table className="w-full text-left">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</th>
                              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Time</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {group.exams?.map((exam, examIdx) => (
                              <tr key={examIdx} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                  {exam.subject}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                  {new Date(exam.date).toLocaleDateString('en-IN', {
                                    weekday: 'short',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-center font-medium">
                                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                                    {exam.start_time} - {exam.end_time}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  {(!batch.exam_groups || batch.exam_groups.length === 0) && (
                    <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500 italic">No exams scheduled for this section yet.</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default ExamTimetable