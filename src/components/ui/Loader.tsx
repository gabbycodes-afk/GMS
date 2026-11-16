
import { LoaderCircle } from "lucide-react";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loader({
  message = "Loading...",
  fullScreen = false,
}: LoaderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen bg-[#0b0b12]" : "py-12"
      }`}
    >
      <LoaderCircle className="animate-spin text-violet-500" size={32} />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
