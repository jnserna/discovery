"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "@/lib/firebase/auth";
import { getJournalEntries, deleteJournalEntry } from "@/lib/firebase/db";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, ExternalLink, BookOpen, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface JournalEntry {
  id: string;
  mood?: string;
  text?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkTitle?: string;
  createdAt?: { seconds: number };
}

function formatDate(entry: JournalEntry, lang: "en" | "es") {
  if (!entry.createdAt?.seconds) return "";
  return new Date(entry.createdAt.seconds * 1000).toLocaleDateString(
    lang === "es" ? "es-ES" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

function JournalContent() {
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const t = {
    en: { title: "My Journal", newEntry: "New Entry", noEntries: "Your journal is empty. Write your first entry.", delete: "Delete", loading: "Loading entries..." },
    es: { title: "Mi Diario", newEntry: "Nueva Entrada", noEntries: "Tu diario está vacío. Escribe tu primera entrada.", delete: "Eliminar", loading: "Cargando entradas..." },
  }[language];

  useEffect(() => {
    if (!user) return;
    getJournalEntries(user.uid).then((data) => {
      setEntries(data as JournalEntry[]);
      setLoading(false);
    });
  }, [user]);

  async function handleDelete(id: string) {
    if (!user) return;
    await deleteJournalEntry(user.uid, id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast.success(language === "es" ? "Entrada eliminada" : "Entry deleted");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <Link href="/journal/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            {t.newEntry}
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          {t.loading}
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>{t.noEntries}</p>
          <Link href="/journal/new" className="mt-4 inline-block">
            <Button variant="outline" className="gap-1.5 mt-3">
              <Plus className="h-4 w-4" />
              {t.newEntry}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="group">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {entry.mood && <span className="text-2xl">{entry.mood}</span>}
                    <span className="text-xs text-muted-foreground">{formatDate(entry, language)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(entry.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                {entry.text && (
                  <p className="text-sm text-foreground leading-relaxed line-clamp-3">{entry.text}</p>
                )}
                <div className="flex gap-2 flex-wrap">
                  {entry.imageUrl && (
                    <Badge variant="secondary" className="text-xs gap-1">📷 Image attached</Badge>
                  )}
                  {entry.linkUrl && (
                    <a href={entry.linkUrl} target="_blank" rel="noopener noreferrer">
                      <Badge variant="outline" className="text-xs gap-1 hover:bg-muted">
                        <ExternalLink className="h-3 w-3" />
                        {entry.linkTitle || "Link"}
                      </Badge>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function JournalPage() {
  return <AuthGuard><JournalContent /></AuthGuard>;
}
