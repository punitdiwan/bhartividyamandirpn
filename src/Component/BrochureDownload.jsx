import React from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const BrochureDownload = ({ endpoint, className = "" }) => {
  const { data, isLoading } = useSWR(endpoint, fetcher);

  const brochure = data?.data?.[0]?.brochure;

  const handleDownload = () => {
    const fileUrl = brochure?.data?.full_url;

    if (!fileUrl) return;

    const url = fileUrl.replace("http://", "https://");

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      brochure?.filename_download || "brochure.pdf"
    );
    link.setAttribute("target", "_blank");

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button
      onClick={handleDownload}
      disabled={!brochure || isLoading}
      className={className}
    >
      {isLoading ? "Loading..." : "Brochure"}
    </button>
  );
};

export default BrochureDownload;