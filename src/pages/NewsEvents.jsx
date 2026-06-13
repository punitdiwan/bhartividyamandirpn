import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../Component/Layout'
import { useHeaderData } from '../hooks/useHeaderData'

const BASE_URL = import.meta.env.VITE_BASE_URL
const SCHOOL = import.meta.env.VITE_SCHOOL

const NewsEvents = () => {
  const header_data = useHeaderData()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${SCHOOL}/items/achievement_events?fields=title,description,image.data.full_url`)
      .then(response => {
        setAchievements(response?.data?.data || [])
      })
      .catch(error => {
        console.error('Achievement events fetch error:', error)
        setAchievements([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout header_data={header_data}>
      <div className="bg-gradient-to-br from-[#0a192f] via-[#112240] to-[#0066cc] min-h-screen py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* <h4 className="text-yellow-400 font-bold uppercase tracking-[0.3em] text-sm mb-3">Achievement Events</h4> */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Our Achievements <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-500">& Events</span>
            </h1>
            <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 text-white/80">
              <div className="w-16 h-16 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin"></div>
              <p className="mt-6 text-white/70 font-medium tracking-wide">Loading achievement events...</p>
            </div>
          ) : achievements.length === 0 ? (
            <div className="text-center py-24 glass rounded-3xl border border-white/10 mx-auto max-w-lg shadow-2xl text-white">
              <div className="text-5xl mb-6">🏆</div>
              <p className="text-2xl font-bold mb-2">No Achievement Events Found</p>
              <p className="text-white/50">Please check again later for latest accomplishments.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {achievements.map((item, index) => {
                const imageUrl = item?.image?.data?.full_url?.replace('http://', 'https://')
                return (
                  <div key={item.id || index} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="relative h-[200px] overflow-hidden bg-slate-900">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item?.title || 'Achievement'}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-slate-800 text-white text-lg font-semibold">
                          No image available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      {/* {item?.date && (
                        <div className="absolute left-4 top-4 rounded-full bg-yellow-400/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-lg">
                          {item.date}
                        </div>
                      )} */}
                    </div>
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-white mb-4">{item?.title || 'Untitled Achievement'}</h2>
                      <p className="text-white/80 leading-8 line-clamp-5">
                        {item?.description ? item.description : 'No description available.'}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default NewsEvents

