import React, { useState, useEffect } from 'react';

const AdmissionBanner = () => {
    const [banner, setBanner] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    // Fetch Banner data
    const getdata = async () => {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const school = process.env.NEXT_PUBLIC_SCHOOL;
 
        try {
            const res = await fetch(`${baseUrl}/${school}/items/admission_banner?fields=*.*.*`);
            const data = await res.json();
            console.log("Fetched data:", data);  // Log the full fetched data

            setBanner(data.data);

            if (data.data && data.data.length > 0) {
                const bannerData = data.data[0];
                console.log("bannerData:", bannerData);  // Log banner data

                setShowBanner(bannerData.show_banner); // Set show_banner to decide whether to show the modal
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata(); // Fetch the banner data when the component mounts
    }, []);

    // Show the modal after 1 second and close after 7 seconds
    useEffect(() => {
        if (showBanner) {
            const openTimer = setTimeout(() => {
                setIsOpen(true); // Open the modal after 1 second if show_banner is true
            }, 1000);

            // Cleanup the timers when the component unmounts
            return () => {
                clearTimeout(openTimer);
            };
        }
    }, [showBanner]);

    // Close the modal manually
    const closeModal = () => {
        setIsOpen(false);
    };

    // Get the image URL from the banner's data
    const getImageUrl = (bannerData) => {
        console.log("bannerData", bannerData);

        // Access the full URL correctly based on the structure of your data
        const url = bannerData?.admission_banner?.data?.full_url?.replace('http://', 'https://');
        console.log("Image URL:", url);  // Log the URL to verify it's correct
        return url || ''; // Return the URL or an empty string if not found
    };

    // Modal rendering logic
    const renderModal = () => {
        if (isOpen && showBanner && banner[0]?.admission_banner?.data?.full_url) {
            return (
                <div
                    id="message-modal"
                    tabIndex="-1"
                    aria-hidden={!isOpen}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 500,
                    }}
                >
                    {/* Modal Content */}
                    <div
                        style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            width: '90%', // Use 90% width for responsiveness
                            maxWidth: '500px', // Adjusted max width for larger images
                            padding: '0',
                            textAlign: 'center',
                            minHeight: '30vh', // Allow modal height to adjust based on content
                            maxHeight: '90vh', // Limit the height for larger screens
                            overflow: 'hidden',
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-1px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '25px',
                                zIndex: 1000,
                                color: 'red',
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                fill="currentcolor"
                                className="bi bi-x"
                                viewBox="0 0 16 16"
                                style={{ marginTop: "10px" }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.354 4.646a.5.5 0 0 0-.708-.708L8 6.293 5.354 3.646a.5.5 0 1 0-.708.708L7.293 7l-2.647 2.646a.5.5 0 0 0 .708.708L8 7.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 7l2.647-2.646z"
                                />
                            </svg>
                        </button>

                        {/* Display Image from Banner's Brochure */}
                        <img
                            src={getImageUrl(banner[0])}
                            alt="Banner"
                            style={{
                                width: '100%',
                                height: '100%', // Use 100% of the modal height
                                objectFit: 'contain', // Ensures image scales well within the container
                                borderRadius: '8px',
                            }}
                        />
                    </div>
                </div>
            );
        }
        return null;
    };

    return renderModal(); // Render the modal based on the state
};

export default AdmissionBanner;
