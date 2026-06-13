import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export function useHeaderData() {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const school = import.meta.env.VITE_SCHOOL
  const { data } = useSWR(
    `${baseUrl}/${school}/items/config?fields=*,logo.data.full_url`,
    fetcher
  )
  return data
}
