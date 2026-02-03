"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout, { type AdminTab } from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import TattooManager from "@/components/admin/TattooManager";
import ContentEditor from "@/components/admin/ContentEditor";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  return (
    <AdminGuard>
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "tattoos" && <TattooManager />}
        {activeTab === "content" && <ContentEditor />}
        {activeTab === "testimonials" && <TestimonialsManager />}
      </AdminLayout>
    </AdminGuard>
  );
}
