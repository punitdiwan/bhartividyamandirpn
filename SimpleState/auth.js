import { entity } from 'simpler-state'

export const base_url = entity(process.env.NEXT_PUBLIC_BASE_URL||'')
export const school_name = entity(process.env.NEXT_PUBLIC_SCHOOL||'')