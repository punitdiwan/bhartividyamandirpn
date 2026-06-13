import React from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = url => fetch(url).then(r => r.json())

// Helper function to extract plain text and create safe excerpt
const getExcerpt = (htmlContent, charLimit = 150) => {
  if (!htmlContent) return '';
  
  // Create a temporary div to extract text content from HTML
  const temp = document.createElement('div');
  temp.innerHTML = htmlContent;
  const plainText = temp.textContent || temp.innerText || '';
  
  // Get first charLimit characters and add ellipsis
  const excerpt = plainText.substring(0, charLimit).trim();
  return excerpt + (excerpt.length >= charLimit ? '...' : '');
}

const BlogList = () => {
  const header_data = useHeaderData()
  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: blogs_data } = useSWR(
    `${baseUrl}/${school}/items/blogs?fields=*.*.*`,
    fetcher
  )

  const blogs = blogs_data?.data || []

  console.log('Fetched blogs:', blogs);

  return (
    <Layout header_data={header_data}>
      <div className="bg-[#f0f4f8] pt-24 pb-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-[#1b3359] mb-4">OUR LATEST BLOGS</h1>
            <p className="text-gray-600 text-lg md:text-xl">Stay updated with the latest news, activities, and educational insights</p>
            <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
          </div>

          {!blogs_data ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#1b3359] border-t-red-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-[#1b3359] font-bold animate-pulse text-xl">Loading fascinating stories...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
              <img src="/images/photo.png" alt="Empty" className="mx-auto h-40 opacity-20 grayscale" />
              <p className="text-2xl text-gray-400 font-medium mt-6">No blogs published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={blog.image?.data?.full_url?.replace('http://', 'https://') || '/images/photo.png'}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      {new Date(blog.date_created || blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-[#1b3359] mb-4 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors">
                      {blog.title}
                    </h2>
                    <div
                      className="text-gray-600 mb-6 line-clamp-3 leading-relaxed"
                    >
                      {getExcerpt(blog.content, 150)}
                    </div>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-2 text-red-600 font-black uppercase tracking-wider group/link"
                    >
                      Read Full Story
                      <svg className="w-5 h-5 transform transition-transform group-hover/link:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogList
