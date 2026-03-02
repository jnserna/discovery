"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "@/lib/firebase/auth";
import { addMemoryCollection, getMemoryCollections, addMemoryItem, getMemoryItems } from "@/lib/firebase/db";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, BookMarked, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Collection { id: string; name: string }
interface MemoryItem { id: string; text: string }

function MemoriesContent() {
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selected, setSelected] = useState<Collection | null>(null);
  const [items, setItems] = useState<MemoryItem[]>([]);
  const [newName, setNewName] = useState("");
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const t = {
    en: { title: "Things I Like to Remember", subtitle: "Create collections of memories that matter to you.", addCollection: "New Collection", addItem: "Add item...", save: "Add", back: "← Back", empty: "No collections yet.", collectionEmpty: "Nothing here yet. Add your first item!", placeholder: "e.g. Cars I've owned, Countries I've visited..." },
    es: { title: "Cosas que Me Gusta Recordar", subtitle: "Crea colecciones de recuerdos que te importan.", addCollection: "Nueva Colección", addItem: "Agregar elemento...", save: "Agregar", back: "← Atrás", empty: "Sin colecciones aún.", collectionEmpty: "Nada aquí todavía. ¡Agrega tu primer elemento!", placeholder: "ej. Autos que he tenido, Países que he visitado..." },
  }[language];

  useEffect(() => {
    if (!user) return;
    getMemoryCollections(user.uid).then((data) => {
      setCollections(data as Collection[]);
      setLoading(false);
    });
  }, [user]);

  async function handleAddCollection() {
    if (!user || !newName.trim()) return;
    const doc = await addMemoryCollection(user.uid, newName.trim());
    setCollections((prev) => [...prev, { id: doc.id, name: newName.trim() }]);
    setNewName("");
    setOpen(false);
  }

  async function handleSelectCollection(col: Collection) {
    setSelected(col);
    if (!user) return;
    const data = await getMemoryItems(user.uid, col.id);
    setItems(data as MemoryItem[]);
  }

  async function handleAddItem() {
    if (!user || !selected || !newItem.trim()) return;
    const doc = await addMemoryItem(user.uid, selected.id, { text: newItem.trim() });
    setItems((prev) => [...prev, { id: doc.id, text: newItem.trim() }]);
    setNewItem("");
    toast.success(language === "es" ? "Elemento agregado" : "Item added");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>{t.back}</Button>
          <h1 className="text-xl font-bold">{selected.name}</h1>
        </div>
        <div className="flex gap-2">
          <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder={t.addItem} onKeyDown={(e) => e.key === "Enter" && handleAddItem()} />
          <Button onClick={handleAddItem} disabled={!newItem.trim()}>{t.save}</Button>
        </div>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t.collectionEmpty}</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-2 py-2 px-3 rounded-xl bg-card border border-border text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {item.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />{t.addCollection}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader><DialogTitle>{t.addCollection}</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-sm">Collection name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.placeholder} onKeyDown={(e) => e.key === "Enter" && handleAddCollection()} />
            </div>
            <Button onClick={handleAddCollection} className="w-full" disabled={!newName.trim()}>{t.save}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {collections.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookMarked className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>{t.empty}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {collections.map((col) => (
            <Card key={col.id} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => handleSelectCollection(col)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookMarked className="h-4 w-4 text-primary" />
                  <span className="font-medium">{col.name}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MemoriesPage() {
  return <AuthGuard><MemoriesContent /></AuthGuard>;
}
