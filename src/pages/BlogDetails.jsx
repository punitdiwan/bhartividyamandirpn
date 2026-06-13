import React from 'react'
import { useParams, Link } from 'react-router-dom'
import useSWR from 'swr'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const fetcher = url => fetch(url).then(r => r.json())

const BlogDetails = () => {
  const { id } = useParams()
  const header_data = useHeaderData()
  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL

  const { data: blog_data, error } = useSWR(
    `${baseUrl}/${school}/items/blogs/${id}?fields=*.*.*`,
    fetcher
  )

  const blog = blog_data?.data

  if (error) {
    return (
      <Layout header_data={header_data}>
        <div className="pt-40 pb-20 text-center">
          <h2 className="text-3xl font-bold text-red-600">Error loading blog post.</h2>
          <Link to="/blog" className="mt-4 inline-block text-[#1b3359] underline">Back to Blogs</Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout header_data={header_data}>
      <div className="bg-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-0">
          {!blog_data ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#1b3359] border-t-red-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-[#1b3359] font-bold">Loading story...</p>
            </div>
          ) : (
            <article>
              <nav className="flex items-center gap-2 text-gray-500 mb-8 font-medium">
                <Link to="/" className="hover:text-red-600">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-red-600">Blogs</Link>
                <span>/</span>
                <span className="text-[#1b3359] truncate">{blog.title}</span>
              </nav>

              <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-black text-[#1b3359] mb-6 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex items-center gap-6 text-gray-500 border-y border-gray-100 py-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-bold">
                      {new Date(blog.date_created || blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </header>

              {blog.image && (
                <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
                  <img
                    src={blog.image?.data?.full_url?.replace('http://', 'https://')}
                    alt={blog.title}
                    className="w-full h-auto object-cover max-h-[500px]"
                  />
                </div>
              )}

              <div
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              <footer className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
                <Link
                  to="/blog"
                  className="flex items-center gap-2 text-[#1b3359] font-black uppercase tracking-wider hover:text-red-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back to all Blogs
                </Link>

                <div className="flex gap-4">
                  {/* Social share icons could go here */}
                </div>
              </footer>
            </article>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default BlogDetails
