import React, { useState, useEffect } from 'react'

const AdmissionBanner = () => {
  const [banner, setBanner] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const school = import.meta.env.VITE_SCHOOL

    fetch(`${baseUrl}/${school}/items/admission_banner?status=published&fields=*.*.*`)
      .then(res => res.json())
      .then(data => {
        setBanner(data.data)
        if (data.data && data.data.length > 0) {
          setShowBanner(data.data[0].show_banner)
        }
      })
      .catch(error => console.error('Error fetching banner:', error))
  }, [])

  useEffect(() => {
    if (!showBanner) return
    const openTimer = setTimeout(() => setIsOpen(true), 1000)
    return () => clearTimeout(openTimer)
  }, [showBanner])

  const getImageUrl = bannerData =>
    bannerData?.admission_banner?.data?.full_url?.replace('http://', 'https://') || ''

  if (!isOpen || !showBanner || !banner[0]?.admission_banner?.data?.full_url) {
    return null
  }

  return (
    <div
      id="message-modal"
      tabIndex="-1"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 500,
      }}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '90%',
          maxWidth: '500px',
          padding: '0',
          textAlign: 'center',
          height: 'auto',
          maxHeight: '90vh',
          overflow: 'hidden',
          marginTop: '80px',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
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
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16" style={{ marginTop: '10px', color: 'white' }}>
            <path fillRule="evenodd" d="M11.354 4.646a.5.5 0 0 0-.708-.708L8 6.293 5.354 3.646a.5.5 0 1 0-.708.708L7.293 7l-2.647 2.646a.5.5 0 0 0 .708.708L8 7.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 7l2.647-2.646z" />
          </svg>
        </button>
        <img
          src={getImageUrl(banner[0])}
          alt="Banner"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
        />
      </div>
    </div>
  )
}

export default AdmissionBanner
