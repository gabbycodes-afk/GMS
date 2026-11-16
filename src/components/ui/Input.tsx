
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  icon,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || props.name;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          id={inputId}
          className={`w-full rounded-xl border bg-[#15151f] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 ${
            error ? "border-red-500/60" : "border-white/10"
          } ${icon ? "pl-11" : ""} ${className}`}
          {...props}
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
