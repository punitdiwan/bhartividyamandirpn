import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const BASE_URL = import.meta.env.VITE_BASE_URL
const SCHOOL = import.meta.env.VITE_SCHOOL || 'technicaltesting'

const normalizeUrl = url => {
  if (!url) return null
  let trimmed = url.trim()
  try {
    trimmed = decodeURIComponent(trimmed) || trimmed
  } catch {
    // ignore
  }

  // Prevent YouTube 'embed' errors by converting back to standard watch links
  if (trimmed.includes('youtube.com/embed/')) {
    const match = trimmed.match(/youtube\.com\/embed\/([\w-]+)/)
    if (match?.[1]) {
      return `https://www.youtube.com/watch?v=${match[1]}`
    }
  }

  return trimmed
}

const getPreviewImage = url => {
  if (!url) return null

  const normalizedUrl = normalizeUrl(url)

  // YouTube Thumbnail
  if (normalizedUrl.includes('youtube.com/watch') || normalizedUrl.includes('youtu.be')) {
    const match = normalizedUrl.match(/(?:v=|\/)([\w-]{11})(?:[&?#]|$)/)
    return match?.[1] ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null
  }

  // Facebook (Placeholder)
  if (normalizedUrl.includes('facebook.com') || normalizedUrl.includes('fb.watch') || normalizedUrl.includes('fb.com')) {
    return 'facebook_svg'
  }

  // Instagram (Placeholder)
  if (normalizedUrl.includes('instagram.com') || normalizedUrl.includes('instagr.am')) {
    return '/images/instagram.png'
  }

  return null
}

const getPlatformIcon = (url) => {
  if (!url) return '▶'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'Youtube'
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'Facebook'
  if (url.includes('instagram.com')) return 'Instagram'
  return '▶'
}

const Videos = () => {
  const header_data = useHeaderData()
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch videos including optional image if they provide it in CMS
    axios
      .get(`${BASE_URL}/${SCHOOL}/items/videos?fields=id,title,description,url`)
      .then(response => {
        setVideos(response?.data?.data || [])
      })
      .catch(error => {
        console.error('Videos fetch error:', error)
        setVideos([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout header_data={header_data}>
      <div className="bg-[#f8f9fa] min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-[#1b3359]">Social Connect</h1>
            <p className="max-w-2xl mx-auto mt-3 text-gray-700">
              Check out our latest updates from YouTube, Facebook, and Instagram!
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center text-gray-700">Loading videos...</div>
          ) : videos.length === 0 ? (
            <div className="py-20 text-center text-gray-700">No videos available right now.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => {
                const rawUrl = normalizeUrl(video?.url)

                // Prioritize CMS Image, fallback to inferred thumbnail based on URL
                const cmsImageUrl = video?.image?.data?.full_url?.replace('http://', 'https://')
                const previewImage = cmsImageUrl || getPreviewImage(rawUrl)
                const platform = getPlatformIcon(rawUrl)

                return (
                  <a
                    key={video.id || index}
                    href={rawUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Media Thumbnail Container */}
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {previewImage && previewImage !== 'facebook_svg' && !previewImage.includes('instagram') ? (
                        <img
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={previewImage}
                          alt={video.title || 'Video Thumbnail'}
                        />
                      ) : previewImage === 'facebook_svg' ? (
                        <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-[#1877F2]">
                          <svg
                            className="h-20 w-20 text-white transition-transform duration-500 group-hover:scale-110"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path fill="currentColor" d="M448 80v352c0 26.5-21.5 48-48 48h-85.3V302.8h60.6l8.7-67.6h-69.3V192c0-19.6 5.4-32.9 33.5-32.9H384V98.7c-6.2-.8-27.4-2.7-52.2-2.7-51.6 0-87 31.5-87 89.4v49.9H184v67.6h60.9V480H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" />
                          </svg>
                        </div>
                      ) : previewImage && previewImage.includes('instagram') ? (
                        <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
                          <img
                            className="h-20 w-20 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                            src={previewImage}
                            alt={platform}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <span className="text-4xl text-gray-400 mb-2">{platform === '▶' ? '🌐' : '📺'}</span>
                          <span>No Preview Available</span>
                        </div>
                      )}

                      {/* Play / Link Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow-lg">
                          Click to {platform === '▶' ? 'Open' : `Watch on ${platform}`}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="mb-2 text-xl font-bold text-gray-800 line-clamp-2">
                        {video.title || 'Untitled Post'}
                      </h2>
                      <div
                        className="text-gray-600 line-clamp-3 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: video.description || 'Watch to learn more about this update.',
                        }}
                      />
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Videos
