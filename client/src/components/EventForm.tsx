import { useState } from 'react'
import { createEvent } from '../api/events'
import type { EventCreate } from '../api/events'

export default function EventForm() {
  const [form, setForm] = useState<EventCreate>({
    name: '', contact: '', venue: '', date: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createEvent(form)
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-xl font-bold">Add Event</h2>
      {['name', 'contact', 'venue', 'date'].map(key => (
        <input key={key}
          type={key === 'date' ? 'datetime-local' : 'text'}
          placeholder={key}
          value={(form as any)[key]}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          className="border px-2 py-1 w-full"
        />
      ))}
      <button className="bg-blue-500 text-white px-3 py-1">Submit</button>
    </form>
  )
}
