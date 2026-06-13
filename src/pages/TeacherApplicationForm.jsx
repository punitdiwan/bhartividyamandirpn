import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHeaderData } from "../hooks/useHeaderData";
import Layout from "../Component/Layout";
import axios from "axios";

const TeacherApplicationForm = () => {
  const location = useLocation();
  const header_data = useHeaderData();

  const [formData, setFormData] = useState({
    full_name: "",
    contact_no: "",
    email: "",
    dob: "",
    applied_for: location.state?.position || "",
    subject_department: "",
    educational_qualification: "",
    professional_qualification: "",
    current_organization: "",
    total_experience: "",
    current_ctc: "",
    statement: "",
    declaration: false,
  });

  const [resume, setResume] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const school = import.meta.env.VITE_SCHOOL;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        payload.append(key, formData[key]);
      });

      if (resume) payload.append("resume", resume);
      if (photo) payload.append("passport_photo", photo);

      const response = await axios.post(
        `/api/teacher_application`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(
        "Application submitted successfully!"
      );

      // Clear the form
      setFormData({
        full_name: "",
        contact_no: "",
        email: "",
        dob: "",
        applied_for: location.state?.position || "",
        subject_department: "",
        educational_qualification: "",
        professional_qualification: "",
        current_organization: "",
        total_experience: "",
        current_ctc: "",
        statement: "",
        declaration: false,
      });
      setResume(null);
      setPhoto(null);

      // Clear file inputs physically
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => {
        input.value = "";
      });

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      setError("Something went wrong.");

      setTimeout(() => {
        setError("");
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout header_data={header_data}>
      <div className="bg-[#f5f8ff] min-h-screen py-16 px-4">

        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#0066cc] to-[#0088ff] px-10 py-10 text-white">
            <h1 className="text-4xl font-bold">
              Teacher Job Application
            </h1>

            <p className="mt-3 text-blue-100 leading-7">
              Join our institution and help shape the future of
              young minds through innovation and excellence in
              education.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-10 space-y-10"
          >

            {/* ===================== */}
            {/* PART 1 */}
            {/* ===================== */}

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0066cc]">
                  Personal Details
                </h2>

                <div className="w-20 h-1 bg-[#0066cc] rounded-full mt-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Full Name */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    placeholder="Enter Full Name"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Contact */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Contact No *
                  </label>

                  <input
                    type="text"
                    name="contact_no"
                    value={formData.contact_no}
                    placeholder="Enter Phone No"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Email Id
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Email Id"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* ===================== */}
            {/* PART 2 */}
            {/* ===================== */}

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0066cc]">
                  Professional Details
                </h2>

                <p className="text-gray-500 mt-2">
                  (If not applicable please fill NA)
                </p>

                <div className="w-20 h-1 bg-[#0066cc] rounded-full mt-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Applied For */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Applied For
                  </label>

                  <input
                    type="text"
                    name="applied_for"
                    value={formData.applied_for}
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Subject / Department
                  </label>

                  <input
                    type="text"
                    name="subject_department"
                    value={formData.subject_department}
                    placeholder="Enter Subject / Department"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Educational Qualification */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Educational Qualification
                  </label>

                  <input
                    type="text"
                    name="educational_qualification"
                    value={formData.educational_qualification}
                    placeholder="Enter Educational Qualification"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Professional Qualification */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Professional Qualification (If Any)
                  </label>

                  <input
                    type="text"
                    name="professional_qualification"
                    value={formData.professional_qualification}
                    placeholder="Enter Professional Qualification"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Current Organization / Fresher
                  </label>

                  <input
                    type="text"
                    name="current_organization"
                    value={formData.current_organization}
                    placeholder="Enter Current Organization"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">
                    Total Years of Experience
                  </label>

                  <input
                    type="text"
                    name="total_experience"
                    value={formData.total_experience}
                    placeholder="Enter Years of Experience"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>

                {/* CTC */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-semibold text-gray-700">
                    Current Salary
                  </label>

                  <input
                    type="text"
                    name="current_ctc"
                    value={formData.current_ctc}
                    placeholder="Enter Current Salary"
                    onChange={handleChange}
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white"
                  />
                </div>
              </div>

              {/* Statement */}
              <div className="mt-6">
                <label className="block mb-2 font-semibold text-gray-700 leading-7">
                  Write a brief statement about why you are
                  interested in working with us and what makes
                  you a strong candidate for the position.
                  (In 100 words)
                </label>

                <textarea
                  name="statement"
                  value={formData.statement}
                  rows={5}
                  maxLength={700}
                  placeholder="Write here..."
                  onChange={handleChange}
                  // required
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:ring-4 focus:ring-blue-100 transition duration-300 bg-white resize-none"
                />
              </div>
            </div>

            {/* ===================== */}
            {/* PART 3 */}
            {/* ===================== */}

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 md:p-8">

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0066cc]">
                  Upload Documents
                </h2>

                <div className="w-20 h-1 bg-[#0066cc] rounded-full mt-3" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Resume */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-700">
                    Resume (Max File Size - 2MB)
                  </label>

                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) =>
                      setResume(e.target.files[0])
                    }
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
                  />
                </div>

                {/* Photo */}
                <div>
                  <label className="block mb-3 font-semibold text-gray-700">
                    Passport Photo (Max File Size - 500KB)
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setPhoto(e.target.files[0])
                    }
                    // required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Confirmation */}
            <div className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-5">

              <input
                type="checkbox"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 accent-[#0066cc]"
              />

              <p className="text-gray-700 leading-7">
                I confirm that all the information given
                above is completely true.
              </p>
            </div>

            {/* Messages */}
            <div
              className={`transition-all duration-500 ${success
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                }`}
            >
              <div className="bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl">
                {success}
              </div>
            </div>

            <div
              className={`transition-all duration-500 ${error
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 h-0 overflow-hidden"
                }`}
            >
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl">
                {error}
              </div>
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#0066cc] to-[#0088ff] text-white px-14 py-4 rounded-2xl text-lg font-semibold hover:scale-[1.02] transition duration-300 shadow-lg"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>

  );
};

export default TeacherApplicationForm;