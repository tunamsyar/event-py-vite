import { useState } from "react";
import { fetchFilteredEvents } from "../api/events";

export default function EventFilters({
  onFilter,
}: {
  onFilter: (events: any[]) => void;
}) {
  const [filters, setFilters] = useState({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    const result = await fetchFilteredEvents(filters);
    onFilter(result);
  };

  return (
    <div className="space-y-2">
      <input
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Name"
        className="input"
      />
      <input
        name="location"
        value={filters.location}
        onChange={handleChange}
        placeholder="Location"
        className="input"
      />
      <input
        name="start_date"
        type="date"
        value={filters.start_date}
        onChange={handleChange}
        className="input"
      />
      <input
        name="end_date"
        type="date"
        value={filters.end_date}
        onChange={handleChange}
        className="input"
      />
      <button onClick={applyFilters} className="btn btn-primary">
        Apply Filters
      </button>
    </div>
  );
}
