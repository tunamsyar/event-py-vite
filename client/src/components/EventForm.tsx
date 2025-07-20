import { useState } from "react";
import { createEvent } from "../api/events";
import type { EventCreate } from "../api/events";

export default function EventForm() {
  const [form, setForm] = useState<EventCreate>({
    name: "",
    contact: "",
    venue: "",
    date: "",
    url: "",
    type: "",
    status: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await createEvent(form);
      setSuccess(true);
      setForm({ name: "", contact: "", venue: "", date: "", url: "", type: "", status: "" }); // Reset form
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (err: any) {
      const message =
        err?.response?.data?.detail ||
        "Failed to create event. Please try again.";
      setError(typeof message === "string" ? message : JSON.stringify(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h2 className="text-xl font-bold">Add Event</h2>
      {["name", "contact", "venue", "date", "url", "type", "status"].map((key) => (
        <input
          key={key}
          type={key === "date" ? "datetime-local" : "text"}
          placeholder={key}
          value={(form as any)[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="border px-2 py-1 w-full"
          required
        />
      ))}

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Event created successfully!</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-3 py-1 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
