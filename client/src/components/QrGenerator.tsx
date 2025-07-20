import React from "react";
import { generateQrUrl } from "../api/events";

type QrGeneratorProps = {
  data: Record<string, any>;
  label?: string;
};

const QrGenerator: React.FC<QrGeneratorProps> = ({ data, label = "Open QR Code" }) => {
  const handleClick = () => {
    const serialized = data.url && !data.url.startsWith("http")
      ? encodeURIComponent(JSON.stringify(data.url))
      : encodeURIComponent(JSON.stringify(data));
    const qrUrl = generateQrUrl(serialized);

    window.open(qrUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
};

export default QrGenerator;
