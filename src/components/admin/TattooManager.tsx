"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminContext } from "./AdminGuard";
import TattooForm from "./TattooForm";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

interface Tattoo {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  featured: number;
  created_at: string;
}

export default function TattooManager() {
  const { password } = useAdminContext();
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTattoo, setEditingTattoo] = useState<Tattoo | null>(null);
  const [deletingTattoo, setDeletingTattoo] = useState<Tattoo | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTattoos = useCallback(async () => {
    try {
      const res = await fetch("/api/tattoos", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      setTattoos(Array.isArray(data) ? data : []);
    } catch {
      // Keep empty list
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    fetchTattoos();
  }, [fetchTattoos]);

  function handleSaved() {
    setShowForm(false);
    setEditingTattoo(null);
    fetchTattoos();
  }

  function handleEdit(tattoo: Tattoo) {
    setEditingTattoo(tattoo);
  }

  async function handleDelete() {
    if (!deletingTattoo) return;
    setDeleteLoading(true);

    try {
      await fetch("/api/tattoos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          id: deletingTattoo.id,
          image_url: deletingTattoo.image_url,
        }),
      });
      setDeletingTattoo(null);
      fetchTattoos();
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
          Dövmeler
        </h2>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gold hover:bg-gold-dark text-black font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ekle
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <Card className="bg-[#1a1a1a] border-[#3a3a3a] mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Yeni Dövme Ekle
            </h3>
            <TattooForm
              onSaved={handleSaved}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editingTattoo}
        onOpenChange={(open) => !open && setEditingTattoo(null)}
      >
        <DialogContent className="bg-[#1a1a1a] border-[#3a3a3a] text-white max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dövme Düzenle</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Dövme bilgilerini güncelleyin
            </DialogDescription>
          </DialogHeader>
          {editingTattoo && (
            <TattooForm
              tattoo={editingTattoo}
              onSaved={handleSaved}
              onCancel={() => setEditingTattoo(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingTattoo}
        onOpenChange={(open) => !open && setDeletingTattoo(null)}
      >
        <DialogContent className="bg-[#1a1a1a] border-[#3a3a3a] text-white max-w-sm">
          <DialogHeader>
            <DialogTitle>Dövmeyi Sil</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Bu dövmeyi silmek istediğinize emin misiniz? Bu işlem geri
              alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeletingTattoo(null)}
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

      {/* Tattoo List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : tattoos.length === 0 ? (
        <Card className="bg-[#1a1a1a] border-[#3a3a3a]">
          <CardContent className="p-12 text-center">
            <p className="text-neutral-400">
              Henüz dövme eklenmemiş. &quot;Yeni Ekle&quot; butonuna tıklayarak
              başlayın.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tattoos.map((tattoo) => (
            <Card
              key={tattoo.id}
              className="bg-[#1a1a1a] border-[#3a3a3a]"
            >
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={tattoo.image_url}
                  alt={tattoo.title}
                  className="w-16 h-16 object-cover rounded-lg border border-[#3a3a3a] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium truncate">
                      {tattoo.title}
                    </h3>
                    {tattoo.featured === 1 && (
                      <Star className="w-4 h-4 text-gold fill-gold shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="secondary"
                      className="bg-[#2a2a2a] text-neutral-300 text-xs"
                    >
                      {tattoo.category}
                    </Badge>
                    <span className="text-xs text-neutral-500">
                      {new Date(tattoo.created_at).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(tattoo)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingTattoo(tattoo)}
                    className="text-neutral-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
