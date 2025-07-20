import { useEffect, useState } from 'react'
import { fetchEvents } from '../api/events'
import type { Event } from '../api/events'
import { Table } from './Table'
import EventFilters from "./EventFilters";
import QrGenerator from './QrGenerator';

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents().then(res => setEvents(res.data))
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Event List</h2>
      <EventFilters onFilter={setEvents} />

      <Table
        data={events}
        columns={[
          { header: "Name", accessor: "name", sortable: true },
          { header: "Venue", accessor: "venue", sortable: true },
          { header: "Date", accessor: "date", sortable: true },
          { header: "Contact", accessor: "contact", sortable: true },
          { header: "URL", accessor: "url", sortable: true },
          { header: "Type", accessor: "type", sortable: true },
          { header: "Status", accessor: "status", sortable: true },
          {
            header: "QR",
            render: (row) => (
              <QrGenerator
                data={{ url: row.url || "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }}
                label="Show Event QR"
              />
            ),
          },
        ]}
      />
    </div>
  );
}
