
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoaderCircle } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white shadow-lg shadow-violet-950/30 hover:bg-violet-500",
  secondary:
    "bg-white/10 text-white hover:bg-white/15",
  outline:
    "border border-white/10 bg-transparent text-gray-300 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white",
  ghost:
    "bg-transparent text-gray-400 hover:bg-white/5 hover:text-white",
  danger:
    "bg-red-500/10 text-red-400 hover:bg-red-500/20",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading && <LoaderCircle size={16} className="animate-spin" />}
      {children}
    </button>
  );
}
