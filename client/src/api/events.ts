import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export type Event = {
  id: string
  name: string
  contact: string
  venue: string
  date: string
}

export type EventCreate = Omit<Event, 'id'>
export const fetchEvents = () => axios.get<Event[]>(`${API_URL}/events/`)
export const createEvent = (data: EventCreate) => axios.post(`${API_URL}/events/`, data)
export const importEvents = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return axios.post(`${API_URL}/events/import`, formData)
}
