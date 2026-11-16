
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0b12] dark:text-white">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((previous) => !previous)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <Navbar onMobileMenu={() => setMobileOpen(true)} />

        <main className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-[#0b0b12]">
          <Outlet />
        </main>

        <footer className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-center text-xs text-slate-500 transition-colors duration-300 dark:border-white/[0.06] dark:bg-[#0b0b12] dark:text-gray-600">
          © {new Date().getFullYear()} GameVault Management System. All rights
          reserved.
        </footer>
      </div>
    </div>
  );
}
