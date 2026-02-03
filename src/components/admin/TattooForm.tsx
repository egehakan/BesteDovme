"use client";

import { useState, useRef, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAdminContext } from "./AdminGuard";
import { Upload, X } from "lucide-react";

const CATEGORIES = [
  "Realism",
  "Line Work",
  "Cover Up",
  "Minimalist",
  "Renkli",
];

interface Tattoo {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  featured: number;
}

interface TattooFormProps {
  tattoo?: Tattoo | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function TattooForm({ tattoo, onSaved, onCancel }: TattooFormProps) {
  const { password } = useAdminContext();
  const isEditing = !!tattoo;

  const [title, setTitle] = useState(tattoo?.title ?? "");
  const [description, setDescription] = useState(tattoo?.description ?? "");
  const [category, setCategory] = useState(tattoo?.category ?? CATEGORIES[0]);
  const [featured, setFeatured] = useState(tattoo?.featured === 1);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(tattoo?.image_url ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  function clearFile() {
    setFile(null);
    setPreview(tattoo?.image_url ?? null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const headers: Record<string, string> = {
        "x-admin-password": password,
      };

      let imageUrl = tattoo?.image_url ?? "";

      // Upload image if new file selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          headers: { "x-admin-password": password },
          body: formData,
        });
        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Görsel yüklenemedi");
        }
        const { url } = await uploadRes.json();
        imageUrl = url;
      }

      if (!imageUrl && !isEditing) {
        setError("Lütfen bir görsel seçin");
        setLoading(false);
        return;
      }

      const body: Record<string, unknown> = {
        title,
        description: description || null,
        category,
        featured,
      };

      if (imageUrl) {
        body.image_url = imageUrl;
      }

      if (isEditing) {
        body.id = tattoo.id;
        const res = await fetch("/api/tattoos", {
          method: "PUT",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Güncelleme başarısız");
      } else {
        const res = await fetch("/api/tattoos", {
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("Ekleme başarısız");
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label className="text-neutral-300">Başlık</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Dövme başlığı"
          className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-neutral-300">Açıklama</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Dövme açıklaması (opsiyonel)"
          className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label className="text-neutral-300">Kategori</Label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-md bg-[#2a2a2a] border border-[#3a3a3a] text-white px-3 py-2 text-sm"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="rounded border-[#3a3a3a] bg-[#2a2a2a] accent-gold"
        />
        <Label htmlFor="featured" className="text-neutral-300 cursor-pointer">
          Öne Çıkan
        </Label>
      </div>

      <div className="space-y-2">
        <Label className="text-neutral-300">Görsel</Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="border-[#3a3a3a] text-neutral-300 hover:bg-[#2a2a2a]"
          >
            <Upload className="w-4 h-4 mr-2" />
            {file ? "Değiştir" : "Seç"}
          </Button>
          {file && (
            <button
              type="button"
              onClick={clearFile}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Önizleme"
              className="w-32 h-32 object-cover rounded-lg border border-[#3a3a3a]"
            />
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-gold hover:bg-gold-dark text-black font-medium"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-neutral-400 hover:text-white"
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
