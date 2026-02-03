"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdminContext } from "./AdminGuard";
import { Save, Check, Upload, X } from "lucide-react";

interface ContentField {
  key: string;
  label: string;
  type: "input" | "textarea";
}

const CONTENT_FIELDS: ContentField[] = [
  { key: "hero_tagline", label: "Ana Sayfa Sloganı", type: "input" },
  { key: "about_text", label: "Hakkımda Metni", type: "textarea" },
  { key: "contact_phone", label: "Telefon", type: "input" },
  { key: "contact_email", label: "E-posta", type: "input" },
  { key: "contact_address", label: "Adres", type: "input" },
  { key: "working_hours", label: "Çalışma Saatleri", type: "input" },
  { key: "whatsapp_number", label: "WhatsApp Numarası", type: "input" },
  { key: "instagram_url", label: "Instagram URL", type: "input" },
];

export default function ContentEditor() {
  const { password } = useAdminContext();
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalRef = useRef<Record<string, string>>({});

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        setContent(data);
        originalRef.current = { ...data };
      } catch {
        setError("İçerik yüklenemedi");
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  function handleChange(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setError("");
    setSaving(true);
    setSaved(false);

    try {
      const headers = {
        "Content-Type": "application/json",
        "x-admin-password": password,
      };

      // Only update changed fields
      const changed = CONTENT_FIELDS.filter(
        (f) => content[f.key] !== originalRef.current[f.key]
      );

      if (changed.length === 0) {
        setSaved(true);
        setSaving(false);
        return;
      }

      await Promise.all(
        changed.map((f) =>
          fetch("/api/content", {
            method: "PUT",
            headers,
            body: JSON.stringify({ key: f.key, value: content[f.key] || "" }),
          })
        )
      );

      originalRef.current = { ...content };
      setSaved(true);
    } catch {
      setError("Kaydetme sırasında bir hata oluştu");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Yükleme başarısız");

      const { url } = await uploadRes.json();

      // Save the URL as site content
      await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ key: "about_image", value: url }),
      });

      setContent((prev) => ({ ...prev, about_image: url }));
      originalRef.current.about_image = url;
    } catch {
      setError("Fotoğraf yüklenirken hata oluştu");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleImageRemove() {
    setError("");
    try {
      await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ key: "about_image", value: "" }),
      });
      setContent((prev) => ({ ...prev, about_image: "" }));
      originalRef.current.about_image = "";
    } catch {
      setError("Fotoğraf silinirken hata oluştu");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display tracking-wide text-2xl text-white mb-6">
        Site İçeriği
      </h2>

      {/* About Photo Upload */}
      <Card className="bg-[#1a1a1a] border-[#3a3a3a] mb-6">
        <CardContent className="p-6">
          <Label className="text-neutral-300 mb-3 block">
            Hakkımda Fotoğrafı (Beste)
          </Label>
          <div className="flex items-start gap-6">
            {content.about_image ? (
              <div className="relative w-32 h-40 bg-[#2a2a2a] border border-[#3a3a3a] overflow-hidden flex-shrink-0">
                <Image
                  src={content.about_image}
                  alt="Beste Bozkurt"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                <button
                  onClick={handleImageRemove}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-40 bg-[#2a2a2a] border border-dashed border-[#4a4a4a] flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-neutral-500 text-center px-2">
                  Fotoğraf yok
                </span>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                variant="outline"
                className="border-[#3a3a3a] text-neutral-300 hover:bg-[#2a2a2a]"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Yükleniyor..." : "Fotoğraf Yükle"}
              </Button>
              <p className="text-xs text-neutral-500">
                Hakkımda bölümünde görünecek fotoğraf. Dikey (portre) format önerilir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-[#3a3a3a]">
        <CardContent className="p-6 space-y-5">
          {CONTENT_FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label className="text-neutral-300">{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  value={content[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                  rows={6}
                />
              ) : (
                <Input
                  value={content[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                />
              )}
            </div>
          ))}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gold hover:bg-gold-dark text-black font-medium"
            >
              {saving ? (
                "Kaydediliyor..."
              ) : saved ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Kaydedildi
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </>
              )}
            </Button>
            {saved && (
              <span className="text-sm text-green-400">
                İçerik güncellendi!
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
