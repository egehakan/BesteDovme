"use client";

import { useEffect, useState, useCallback, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminContext } from "./AdminGuard";
import { Plus, Trash2, MessageSquare } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

export default function TestimonialsManager() {
  const { password } = useAdminContext();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      // Keep empty list
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setFormLoading(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ name, text }),
      });

      if (res.ok) {
        setName("");
        setText("");
        setShowForm(false);
        fetchTestimonials();
      }
    } catch {
      // Silently fail
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete() {
    if (deletingId === null) return;
    setDeleteLoading(true);

    try {
      await fetch("/api/testimonials", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ id: deletingId }),
      });
      setDeletingId(null);
      fetchTestimonials();
    } catch {
      // Silently fail
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display tracking-wide text-2xl text-white">
          Müşteri Yorumları
        </h2>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gold hover:bg-gold-dark text-black font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Yorum Ekle
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="bg-[#1a1a1a] border-[#3a3a3a] mb-6">
          <CardContent className="p-6">
            <form onSubmit={handleAdd} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-neutral-300">İsim</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Müşteri adı"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-neutral-300">Yorum</Label>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Müşteri yorumu"
                  className="bg-[#2a2a2a] border-[#3a3a3a] text-white"
                  rows={3}
                  required
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={formLoading}
                  className="bg-gold hover:bg-gold-dark text-black font-medium"
                >
                  {formLoading ? "Ekleniyor..." : "Ekle"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowForm(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deletingId !== null}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <DialogContent className="bg-[#1a1a1a] border-[#3a3a3a] text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Yorumu Sil</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri
              alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeletingId(null)}
              className="text-neutral-400 hover:text-white"
            >
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Siliniyor..." : "Sil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonials List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : testimonials.length === 0 ? (
        <Card className="bg-[#1a1a1a] border-[#3a3a3a]">
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <p className="text-neutral-400">
              Henüz yorum eklenmemiş. &quot;Yeni Yorum Ekle&quot; butonuna
              tıklayarak başlayın.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-[#1a1a1a] border-[#3a3a3a]"
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium">
                    {testimonial.name}
                  </h3>
                  <p className="text-neutral-400 text-sm mt-1 line-clamp-3">
                    {testimonial.text}
                  </p>
                  <span className="text-xs text-neutral-500 mt-2 block">
                    {new Date(testimonial.created_at).toLocaleDateString(
                      "tr-TR"
                    )}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeletingId(testimonial.id)}
                  className="text-neutral-400 hover:text-red-400 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
