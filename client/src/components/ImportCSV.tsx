import { useState } from 'react'
import { importEvents } from '../api/events'

export default function ImportCSV() {
	const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null); // Reset error state
      const result = await importEvents(file);

      if (result.errors.length > 0) {
        console.error("Import errors:", result.errors);
        alert(
          `Imported: ${result.imported}\nErrors:\n` +
            result.errors.map((e: { row: any; error: any; }) => `Row ${e.row}: ${e.error}`).join("\n")
        );
      } else {
        alert(`Successfully imported ${result.imported} events.`);
      }

      location.reload();
    } catch (err: any) {
      alert("Failed to import CSV.");
      console.error(err);
    }
  };


	return (
		<div>
			<h2 className="text-xl font-bold">Import CSV</h2>
			<input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p className="text-red-500 mt-2">{error}</p>}
		</div>
	)
}
