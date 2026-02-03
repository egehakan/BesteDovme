"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import AdminLogin from "./AdminLogin";

interface AdminContextType {
  password: string;
}

const AdminContext = createContext<AdminContextType>({ password: "" });

export function useAdminContext() {
  return useContext(AdminContext);
}

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [password, setPassword] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("admin_password");
    setPassword(stored);
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!password) {
    return (
      <AdminLogin
        onLogin={() => {
          setPassword(sessionStorage.getItem("admin_password"));
        }}
      />
    );
  }

  return (
    <AdminContext.Provider value={{ password }}>
      {children}
    </AdminContext.Provider>
  );
}
