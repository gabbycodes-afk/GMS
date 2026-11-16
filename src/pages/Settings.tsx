
import { useState } from "react";
import {
  Settings2,
  UserRound,
  Palette,
  Moon,
  Sun,
  Monitor,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Gamepad2,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const sectionClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-[#171827]";

  const sectionHeaderClass =
    "flex items-center gap-3 border-b border-slate-200 px-6 py-5 dark:border-white/10";

  const iconBoxClass =
    "rounded-xl bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-500/10 dark:text-violet-300";

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* Page heading */}
      <section className="relative overflow-hidden rounded-3xl border border-violet-200 bg-gradient-to-br from-violet-100 via-indigo-50 to-white p-7 transition-colors duration-300 dark:border-violet-400/20 dark:from-[#251642] dark:via-[#19172e] dark:to-[#111827] sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-600/20" />

        <div className="relative">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-300">
            <Settings2 size={17} />
            PERSONALISE YOUR EXPERIENCE
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Settings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Manage your account, customise your GameVault experience, and
            control your preferences.
          </p>
        </div>
      </section>

      {/* Account information */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={iconBoxClass}>
            <UserRound size={19} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Account information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your current GameVault administrator account
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xl font-black text-white shadow-lg shadow-violet-950/20">
            {(user?.username || "A").slice(0, 1).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {user?.username || "Game Admin"}
            </p>

            <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
              {user?.email || "No email available"}
            </p>

            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={13} />
              Administrator
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 dark:border-white/10 dark:bg-[#10111d] dark:text-slate-400">
            <span className="block font-semibold text-slate-700 dark:text-slate-300">
              Account status
            </span>

            <span className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Active
            </span>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={iconBoxClass}>
            <Palette size={19} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Appearance
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Choose how GameVault looks on your device
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Interface theme
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Your preference is saved automatically.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Dark mode option */}
            <button
              type="button"
              onClick={() => {
                if (theme !== "dark") toggleTheme();
              }}
              className={`relative rounded-2xl border p-4 text-left transition ${
                theme === "dark"
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-slate-200 bg-slate-50 hover:border-violet-300 dark:border-white/10 dark:bg-[#10111d] dark:hover:border-white/20"
              }`}
            >
              {theme === "dark" && (
                <span className="absolute right-3 top-3 rounded-full bg-violet-500 p-1 text-white">
                  <Check size={12} />
                </span>
              )}

              <div className="mb-4 flex h-24 items-center justify-center rounded-xl border border-white/10 bg-[#0d0e18]">
                <Moon size={30} className="text-violet-300" />
              </div>

              <div className="flex items-center gap-2">
                <Moon size={15} className="text-violet-500 dark:text-violet-300" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Dark mode
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                The gaming-inspired dark interface
              </p>
            </button>

            {/* Light mode option */}
            <button
              type="button"
              onClick={() => {
                if (theme !== "light") toggleTheme();
              }}
              className={`relative rounded-2xl border p-4 text-left transition ${
                theme === "light"
                  ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10"
                  : "border-slate-200 bg-slate-50 hover:border-violet-300 dark:border-white/10 dark:bg-[#10111d] dark:hover:border-white/20"
              }`}
            >
              {theme === "light" && (
                <span className="absolute right-3 top-3 rounded-full bg-violet-500 p-1 text-white">
                  <Check size={12} />
                </span>
              )}

              <div className="mb-4 flex h-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-100">
                <Sun size={30} className="text-amber-500" />
              </div>

              <div className="flex items-center gap-2">
                <Sun size={15} className="text-amber-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Light mode
                </span>
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                A brighter interface for daytime use
              </p>
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#10111d]">
            <Monitor size={18} className="text-slate-500" />

            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Current theme
              </p>
              <p className="mt-1 text-xs capitalize text-slate-500 dark:text-slate-400">
                {theme} mode
              </p>
            </div>

            <span className="rounded-lg bg-violet-100 px-3 py-1.5 text-xs font-semibold capitalize text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
              {theme}
            </span>
          </div>
        </div>
      </section>

      {/* Application information */}
      <section className={sectionClass}>
        <div className={sectionHeaderClass}>
          <div className={iconBoxClass}>
            <Gamepad2 size={19} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Application information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              About your gaming management dashboard
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 px-6 dark:divide-white/5">
          <div className="flex items-center justify-between gap-4 py-4">
            <span className="text-sm text-slate-500">Application</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              GameVault
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <span className="text-sm text-slate-500">Version</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              1.0.0
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-4">
            <span className="text-sm text-slate-500">Environment</span>
            <span className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Demo
            </span>
          </div>
        </div>
      </section>

      {/* Sign out */}
      <section className="overflow-hidden rounded-2xl border border-red-500/20 bg-white dark:bg-[#171827]">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <LogOut size={18} className="text-red-500 dark:text-red-400" />
              <h2 className="font-bold">Sign out</h2>
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              End your current GameVault administrator session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowLogoutConfirmation(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <LogOut size={16} />
            Log out
            <ChevronRight size={15} />
          </button>
        </div>
      </section>

      {/* Logout confirmation */}
      {showLogoutConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#191a2b]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500 dark:text-red-400">
              <LogOut size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Log out of GameVault?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              You will be returned to the login page. You can sign in again
              using your administrator credentials.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowLogoutConfirmation(false)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-400"
              >
                Yes, log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
