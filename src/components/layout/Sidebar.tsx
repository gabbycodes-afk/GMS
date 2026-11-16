
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const navigation = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Games Library", path: "/games", icon: Gamepad2 },
  { label: "Players", path: "/players", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-white/[0.07] dark:bg-[#11111a] lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          collapsed ? "lg:w-[88px]" : "lg:w-[260px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-white/[0.07]">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-950/20">
              <Gamepad2 size={22} className="text-white" />
            </div>

            {!collapsed && (
              <div className="whitespace-nowrap">
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  GameVault
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">
                  Management System
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pt-7">
          {!collapsed && (
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-gray-600">
              Workspace
            </p>
          )}

          <nav className="space-y-1.5">
            {navigation.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onMobileClose}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-100 text-violet-700 shadow-inner shadow-violet-500/5 dark:bg-violet-500/15 dark:text-violet-300"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-500 dark:hover:bg-white/[0.04] dark:hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                <Icon size={19} className="shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap">{label}</span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-4 p-4">
          <div
            className={`rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-100 to-indigo-50 p-3 dark:border-violet-500/15 dark:from-violet-500/10 dark:to-indigo-500/5 ${
              collapsed ? "flex justify-center" : ""
            }`}
          >
            <Shield
              size={collapsed ? 20 : 22}
              className="text-violet-600 dark:text-violet-400"
            />

            {!collapsed && (
              <>
                <p className="mt-3 text-xs font-semibold text-slate-900 dark:text-white">
                  GameVault Admin
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-gray-500">
                  Manage your gaming community from one place.
                </p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-gray-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={19} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>

          <button
            type="button"
            onClick={onToggle}
            className="hidden w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:border-white/[0.07] dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-white lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={17} />
            ) : (
              <ChevronLeft size={17} />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
