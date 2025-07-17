import { importEvents } from '../api/events'

export default function ImportCSV() {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await importEvents(file)
      location.reload()
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Import CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  )
}
