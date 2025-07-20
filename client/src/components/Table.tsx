import React, { useState } from "react";
import "./table.css";

export type ColumnDef<T> = {
  header: string;
  accessor?: keyof T;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export function Table<T>({ data, columns }: Props<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig]);

  const toggleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <table className="table-container table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.accessor ?? col.header)}
              className="p-2 border-b bg-gray-100 cursor-pointer"
              onClick={() =>
                col.sortable && col.accessor && toggleSort(col.accessor)
              }
            >
              {col.header}
              {sortConfig.key === col.accessor && (
                <span>{sortConfig.direction === "asc" ? " ↑" : " ↓"}</span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td
                key={String(col.accessor ?? col.header)}
                className="p-2 border-b"
              >
                {col.render
                  ? col.render(row)
                  : String(row[col.accessor!] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
