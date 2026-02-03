"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Image,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export type AdminTab = "dashboard" | "tattoos" | "content" | "testimonials";

interface NavItem {
  id: AdminTab;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "tattoos", label: "Dövmeler", icon: <Image className="w-5 h-5" /> },
  { id: "content", label: "İçerik", icon: <FileText className="w-5 h-5" /> },
  { id: "testimonials", label: "Yorumlar", icon: <MessageSquare className="w-5 h-5" /> },
];

interface AdminLayoutProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: ReactNode;
}

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem("admin_password");
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-[#1a1a1a] border-r border-[#3a3a3a]">
        <div className="p-6 border-b border-[#3a3a3a]">
          <h1 className="font-display tracking-wide text-lg text-white">
            Bestemiy Ink
          </h1>
          <p className="text-xs text-neutral-400 mt-1">Yönetim Paneli</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-gold/10 text-gold"
                  : "text-neutral-400 hover:text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[#3a3a3a]">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-neutral-400 hover:text-red-400 hover:bg-red-400/10"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Çıkış Yap
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center justify-between p-4 bg-[#1a1a1a] border-b border-[#3a3a3a]">
          <div>
            <h1 className="font-display tracking-wide text-lg text-white">
              Bestemiy Ink
            </h1>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-b border-[#3a3a3a] p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-gold/10 text-gold"
                    : "text-neutral-400 hover:text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Çıkış Yap
            </button>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
