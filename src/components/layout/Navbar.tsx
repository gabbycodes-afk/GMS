
import { useState } from "react";
import {
  Bell,
  Menu,
  Moon,
  Sun,
  ChevronDown,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onMobileMenu: () => void;
}

export default function Navbar({ onMobileMenu }: NavbarProps) {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl transition-colors duration-300 sm:px-6 lg:px-8 dark:border-white/[0.07] dark:bg-[#0b0b12]/90">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenu}
          aria-label="Open navigation"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/10 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white lg:hidden"
        >
          <Menu size={19} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex dark:text-gray-500">
          <ShieldCheck size={16} className="text-violet-500 dark:text-violet-400" />
          <span>Admin Workspace</span>
        </div>

        <div className="relative sm:hidden">
          <Search size={16} className="text-violet-500 dark:text-violet-400" />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-violet-600 dark:border-white/[0.07] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setNotificationsOpen((open) => !open);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/[0.07] dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-500 ring-2 ring-white dark:ring-[#0b0b12]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-white/10 dark:bg-[#181822]">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Notifications
                </h3>
                <span className="text-[10px] text-violet-600 dark:text-violet-400">
                  New
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-slate-100 p-3 dark:bg-white/[0.04]">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  Welcome to GameVault
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-gray-500">
                  Your gaming management workspace is ready.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((open) => !open);
              setNotificationsOpen(false);
            }}
            className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white">
              {user?.username?.charAt(0) ?? "A"}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">
                {user?.username ?? "Administrator"}
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500 dark:text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={14}
              className="hidden text-slate-400 dark:text-gray-500 sm:block"
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl dark:border-white/10 dark:bg-[#181822]">
              <p className="truncate px-2 py-2 text-xs text-slate-500 dark:text-gray-500">
                {user?.email}
              </p>

              <div className="my-2 border-t border-slate-200 dark:border-white/[0.07]" />

              <p className="px-2 py-2 text-xs text-slate-600 dark:text-gray-400">
                Signed in as administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
