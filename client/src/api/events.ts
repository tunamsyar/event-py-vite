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

export const fetchEvents = () => axios.get<Event[]>(`${API_URL}events/`)

export async function fetchFilteredEvents(filters: {
  name?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
}) {
  const params = new URLSearchParams();

  if (filters.name && filters.name.trim() !== "") {
    params.append("name", filters.name.trim())
  }
  if (filters.location && filters.location.trim() !== "") {
    params.append("location", filters.location.trim())
  }
  if (filters.start_date && filters.start_date.trim() !== "") {
    params.append("start_date", filters.start_date)
  }
  if (filters.end_date && filters.end_date.trim() !== "") {
    params.append("end_date", filters.end_date)
  }

  console.log("Fetching events with filters:", params.toString());
  const res = await fetch(`${API_URL}events?${params.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch events")
  }
  return await res.json()
}

export const createEvent = (data: EventCreate) => axios.post(`${API_URL}events/`, data)

export const importEvents = async (file: File) => {
	try {
		const formData = new FormData()
		formData.append('file', file)
		const response = await axios.post(`${API_URL}events/import`, formData)
		return response.data
	} catch (error) {
		throw error;
	}
}
