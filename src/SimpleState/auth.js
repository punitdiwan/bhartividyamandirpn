import { entity } from 'simpler-state'

export const base_url = entity(import.meta.env.VITE_BASE_URL || '')
export const school_name = entity(import.meta.env.VITE_SCHOOL || '')
