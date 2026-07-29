import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  FileText,
  CreditCard,
  Users,
  Award,
  BookOpen,
  Globe,
  LogOut,
  Menu,
  X,
  User,
  Clock,
  ChevronLeft
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_username");
    if (!token) {
      navigate("/admin");
    } else {
      setUsername(storedUser || "Waqt Admin");
    }
  }, [navigate]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setCurrentTime(now.toLocaleString("en-GB", options).replace(",", " |"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    navigate("/admin");
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutGrid },
    { name: "Applications", path: "/admin/leads", icon: FileText },
    { name: "Master & EDI Loans", path: "/admin/edi-loans", icon: CreditCard },
    { name: "Landing Leads", path: "/admin/leads", icon: Users },
    { name: "CIBIL Reports", path: "/admin/cibil", icon: Award },
    { name: "Blog CMS", path: "/admin/blogs", icon: BookOpen },
    { name: "View Website", path: "/", icon: Globe, external: true }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0B132B] text-slate-300 shrink-0 select-none">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#6d28d9] flex items-center justify-center text-white font-extrabold shadow-md">
              <span className="text-sm tracking-tighter">WM</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Waqt Money</span>
          </div>
          <button className="h-6 w-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition">
            <ChevronLeft size={14} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname.startsWith(link.path) && link.path !== "/";
            return link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800/60 hover:text-white transition"
              >
                <Icon size={18} />
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  active
                    ? "bg-[#1E293B] text-blue-400 shadow-xs border-l-4 border-blue-500"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon size={18} className={active ? "text-blue-400" : "text-slate-400"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-[#070D1E]/60">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User size={18} />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{username}</p>
              <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">ADMIN</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition border border-slate-800"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs"
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`lg:hidden fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B132B] text-slate-300 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#6d28d9] flex items-center justify-center text-white font-extrabold text-xs">
              WM
            </div>
            <span className="font-bold text-base text-white">Waqt Money</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-grow p-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = location.pathname.startsWith(link.path) && link.path !== "/";
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  active ? "bg-[#1E293B] text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition border border-slate-800"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top Clock Bar */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900 p-1"
            >
              <Menu size={22} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 shadow-2xs">
            <Clock size={14} className="text-blue-600" />
            <span>{currentTime || "21 Jul 2026 | 12:18:31 PM"}</span>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-grow p-6 sm:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
