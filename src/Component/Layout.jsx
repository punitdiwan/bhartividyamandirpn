import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout = ({ children, header_data }) => {
  useEffect(() => {
    const schoolData = header_data?.data?.[0]
    const title = schoolData?.title1 || 'BHARTI VIDYA MANDIR HR. SEC. SCHOOL Panchsheel Nagar'
    const iconUrl = schoolData?.logo?.data?.full_url?.replace('http://', 'https://') || '/logo.png'

    document.title = title

    const existingIcon = document.querySelector("link[rel*='icon']")
    if (existingIcon) {
      existingIcon.href = iconUrl
      existingIcon.type = 'image/png'
    } else {
      const link = document.createElement('link')
      link.rel = 'icon'
      link.type = 'image/png'
      link.href = iconUrl
      document.head.appendChild(link)
    }
  }, [header_data])

  return (
    <div>
      <Header header_data={header_data} />
      {children}
      <Footer header_data={header_data} />
    </div>
  )
}

export default Layout
