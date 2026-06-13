import React, { useState } from "react"
import useSWR from "swr"
import Layout from "../Component/Layout"
import { useHeaderData } from "../hooks/useHeaderData"
import { useFeeStructure } from "../hooks/useSchoolData"

const FeesStructure = () => {
  const header_data = useHeaderData()
  const fetcher = url => fetch(url).then(r => r.json())

  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: cmsData } = useSWR(
    `${baseUrl}/${school}/items/fees_structure?fields=*.*.*`,
    fetcher
  )

  const { data: erpData, loading: erpLoading } = useFeeStructure()
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
          Fees Structure
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          The fee structure provides transparency and helps parents plan their finances for the academic year.
        </p>

        {/* CMS Table Card (Files) */}
        {cmsData?.data && cmsData.data.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100 mb-12">
            <table className="w-full text-left">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wide">
                    Fee Category
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold tracking-wide text-center">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {cmsData.data.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        {item.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a
                        href={item?.file?.data?.full_url?.replace("http://", "https://")}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition"
                      >
                        ⬇ Download PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ERP Fees Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Current Academic Year Fees ({erpData?.academic_year?.ay_name})</h2>

          {erpLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading academic year fees...</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white">
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
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md transition"
                        >
                          View Details
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
          Fee documents are official and updated as per academic session.
        </p>

      </div>

      {/* Modal */}
      {isModalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto relative">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-20">
              <h3 className="text-2xl font-bold text-gray-800">
                Fee Details: {selectedClass.course_name}
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
              {(() => {
                const batch = selectedClass.batches?.[0]; // Use first batch for "class-wise" view
                const isBatchApproved = true; // Placeholder status
                const toCapitalizeTrim = (s) => (s || "").trim().charAt(0).toUpperCase() + (s || "").trim().slice(1).toLowerCase();

                const displayData = batch?.fee_collections?.map(coll => ({
                  collectionName: coll.name,
                  startDate: coll.start_date,
                  endDate: coll.end_date,
                  feesParticular: coll.particulars?.map(p => ({
                    name: p.name,
                    fees: p.amount,
                    category_name: p.applied_on
                  })),
                  totalAmount: coll.total_amount
                })) || [];

                const displayData2 = batch?.onetime_fees?.map(f => ({
                  collectionName: f.name,
                  startDate: "-",
                  endDate: "-",
                  feesParticular: [{
                    name: f.name,
                    fees: f.amount,
                    category_name: f.category
                  }],
                  totalAmount: f.amount
                })) || [];

                const totalCollAmt = displayData.reduce((acc, curr) => acc + curr.totalAmount, 0);
                const totalCollAmt2 = displayData2.reduce((acc, curr) => acc + curr.totalAmount, 0);
                const summary = { totalCollAmt, totalCollAmt2 };

                return (
                  <div
                    id="#backToTop"
                    className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1"
                  >
                    <div className="">
                      <div className=" flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-3 mb-3 ml-3  mr-3">
                        <div className="flex flex-col">
                          <div className=" flex items-center text-lg ">
                            <p className="">Status for {erpData?.academic_year?.ay_name || "N/A"}:</p>
                            <div
                              className={`${isBatchApproved ? "bg-green-500" : "bg-orange-500"
                                } inline ms-3 p-[1px] px-2 rounded-full`}
                            >
                              <p className="font-bold text-white text-sm">
                                {toCapitalizeTrim(isBatchApproved ? "Approved" : "Pending")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center font-semibold border-2 border-[#d3e0e9] dark:border-strokedark p-2 mb-4">
                      {!isBatchApproved && (
                        <p className="text-red-500">
                          Please review the fees structure thoroughly before approving,
                          ensuring certainty before finalizing. Fees Structure can only be
                          approved by admin
                        </p>
                      )}
                      {isBatchApproved && (
                        <p className="text-green-600">
                          This fee structure is official for the current academic year.
                        </p>
                      )}
                    </div>
                    <div className="max-w-full overflow-x-auto">
                      <table className="w-full table-auto border-collapse">
                        <thead>
                          <tr className="bg-gray-100 text-left dark:bg-meta-4">
                            <th className="border-2 py-4 px-4 font-medium text-black dark:text-white"></th>
                            <th
                              colSpan={3}
                              className="border-2 py-2 px-4 font-medium text-xl text-black dark:text-black"
                            >
                              <span className="font-semibold">Class:</span>{" "}
                              {selectedClass.course_name}
                            </th>
                          </tr>
                          <tr>
                            <th className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                              <span className="font-semibold">Collection Name</span>
                            </th>
                            <th className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                              <span className="font-semibold">Start/End date</span>
                            </th>
                            <th className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                              <span className="font-semibold">Fees Particular</span>
                            </th>

                            <th className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                              <span className="font-semibold">Total Amount</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {displayData?.length > 0 &&
                            displayData?.map((item, index) => (
                              <tr key={index}>
                                <td className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                                  {item?.collectionName}
                                </td>
                                <td className="border-2 py-4 px-4 font-medium text-sm text-black dark:text-black">
                                  <p className="">
                                    <span className="font-semibold">start: </span>
                                    {item?.startDate}
                                  </p>
                                  <p className="">
                                    <span className="font-semibold">end: </span>
                                    {item?.endDate}
                                  </p>
                                </td>
                                <td className="border-2 p-2 font-medium text-black dark:text-black">
                                  {item?.feesParticular?.length > 0 && (
                                    <table className="text-sm w-[100%] border-collapse">
                                      <thead>
                                        <tr>
                                          <th className="p-1 text-start border dark:border-gray-700 light:border-gray-200 bg-gray-50">
                                            Name
                                          </th>
                                          <th className="p-1 text-start border dark:border-gray-700 light:border-gray-200 bg-gray-50">
                                            Amt
                                          </th>
                                          <th className="p-1 text-start border dark:border-gray-700 light:border-gray-200 bg-gray-50">
                                            Applied on
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {item?.feesParticular?.map((fee, i) => (
                                          <tr key={i}>
                                            <td className="p-1 border dark:border-gray-700 light:border-gray-200">
                                              {fee?.name}
                                            </td>
                                            <td className="p-1 border dark:border-gray-700 light:border-gray-200">
                                              ₹{fee?.fees?.toLocaleString('en-IN')}
                                            </td>
                                            <td className="p-1 border dark:border-gray-700 light:border-gray-200">
                                              {fee?.category_name || "All"}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  )}
                                </td>
                                <td className="border-2 py-4 px-4 font-medium text-black dark:text-black">
                                  ₹{item?.totalAmount?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                          {/*====== Total of fee collections ========= */}
                          {displayData?.length > 0 && (
                            <tr className="bg-gray-100 text-left">
                              <td
                                colSpan={3}
                                className="border-2 py-4 px-4 font-bold text-black text-right"
                              >
                                Total
                              </td>
                              <td className="border-2 py-4 px-4 font-bold text-black">
                                ₹{summary?.totalCollAmt?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          )}
                          {/*====== Start onetime collections ========= */}
                          {displayData2?.length > 0 && (
                            <tr className="bg-gray-200 text-left">
                              <td
                                colSpan={4}
                                className="border-2 py-4 px-4 font-bold text-black"
                              >
                                <span className="font-semibold text-xl">
                                  Onetime fees :
                                </span>
                              </td>
                            </tr>
                          )}
                          {displayData2?.length > 0 &&
                            displayData2?.map((item, index) => (
                              <tr key={index}>
                                <td className="border-2 py-4 px-4 font-medium text-black">
                                  {item?.collectionName}
                                </td>
                                <td className="border-2 py-4 px-4 font-medium text-sm text-black">
                                  -
                                </td>
                                <td className="border-2 p-2 font-medium text-black">
                                  {item?.feesParticular?.[0]?.category_name}
                                </td>
                                <td className="border-2 py-4 px-4 font-medium text-black">
                                  ₹{item?.totalAmount?.toLocaleString('en-IN')}
                                </td>
                              </tr>
                            ))}
                          {/*====== Total of onetime collections ========= */}
                          {displayData2?.length > 0 && (
                            <tr className="bg-gray-100 text-left">
                              <td
                                colSpan={3}
                                className="border-2 py-4 px-4 font-bold text-black text-right"
                              >
                                Total Onetime
                              </td>
                              <td className="border-2 py-4 px-4 font-bold text-black">
                                ₹{summary?.totalCollAmt2?.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          )}
                          <tr className="bg-indigo-600 text-white">
                            <td colSpan={3} className="border-2 py-4 px-4 font-black text-xl text-right">Grand Total</td>
                            <td className="border-2 py-4 px-4 font-black text-xl">₹{(summary.totalCollAmt + summary.totalCollAmt2).toLocaleString('en-IN')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default FeesStructure