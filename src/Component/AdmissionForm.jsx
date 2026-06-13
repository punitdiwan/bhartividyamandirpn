import React, { useState } from "react";

const AdmissionForm = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const school = import.meta.env.VITE_SCHOOL;

  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    mobile: "",
    dob: "",
    guardian_name: "",
    address: "",
    class: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(
        `${baseUrl}/${school}/items/admission_enquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Admission enquiry failed:", errorText);
        throw new Error("Failed to submit form");
      }

      setSuccess("Admission enquiry submitted successfully!");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);

      setFormData({
        student_name: "",
        email: "",
        mobile: "",
        dob: "",
        guardian_name: "",
        address: "",
        class: "",
      });

    } catch (err) {
      setError("Something went wrong. Please try again.");

      // Hide error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white shadow-2xl rounded-3xl p-8 md:p-10 border border-gray-100">

      {/* Top Accent */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0066cc] to-[#00a6ff]" />

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#0066cc]">
          Admission Enquiry
        </h2>

        <p className="text-gray-500 mt-2">
          Fill in the details below and our team will contact you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Student Name */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Student Name
          </label>

          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
            placeholder="Enter student name"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
          />
        </div>

        {/* Email + Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Your Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="Enter mobile number"
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Class + DOB */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Class */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Class
            </label>

            <select
              name="class"
              value={formData.class}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
            >
              <option value="">Select Class</option>

              <option value="Playgroup">Playgroup</option>
              <option value="Nursery">Nursery</option>
              <option value="KG-1">KG-1</option>
              <option value="KG-2">KG-2</option>

              <option value="Class 1">Class 1</option>
              <option value="Class 2">Class 2</option>
              <option value="Class 3">Class 3</option>
              <option value="Class 4">Class 4</option>
              <option value="Class 5">Class 5</option>
              <option value="Class 6">Class 6</option>
              <option value="Class 7">Class 7</option>
              <option value="Class 8">Class 8</option>
              <option value="Class 9">Class 9</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Date Of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Guardian */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Guardian's Name
          </label>

          <input
            type="text"
            name="guardian_name"
            value={formData.guardian_name}
            onChange={handleChange}
            required
            placeholder="Enter guardian's name"
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Address
          </label>

          <textarea
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Enter address..."
            className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 outline-none focus:border-[#0066cc] focus:bg-white transition resize-none"
          />
        </div>

        {/* Success Message */}
        <div
          className={`transition-all duration-500 ease-in-out ${success
            ? "opacity-100 translate-y-0 max-h-20 mb-2"
            : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
            }`}
        >
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
            {success}
          </div>
        </div>

        {/* Error Message */}
        <div
          className={`transition-all duration-500 ease-in-out ${error
            ? "opacity-100 translate-y-0 max-h-20 mb-2"
            : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
            }`}
        >
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#0066cc] to-[#0088ff] text-white py-4 rounded-xl font-semibold text-lg hover:scale-[1.01] hover:shadow-xl transition duration-300 disabled:opacity-70"
        >
          {loading ? "Submitting..." : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;