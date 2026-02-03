"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        sessionStorage.setItem("admin_password", password);
        onLogin();
      } else {
        setError("Geçersiz şifre");
      }
    } catch {
      setError("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a] p-4">
      <Card className="w-full max-w-sm bg-[#1a1a1a] border-[#3a3a3a]">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
            <Lock className="w-6 h-6 text-gold" />
          </div>
          <CardTitle className="font-display tracking-wide text-xl text-white">
            Bestemiy Ink
          </CardTitle>
          <p className="text-sm text-neutral-400">Yönetim Paneli</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-neutral-300">
                Şifre
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin şifresini girin"
                className="bg-[#2a2a2a] border-[#3a3a3a] text-white placeholder:text-neutral-500"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-dark text-black font-medium"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
