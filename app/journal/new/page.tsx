"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/lib/firebase/auth";
import { addJournalEntry } from "@/lib/firebase/db";
import { storage } from "@/lib/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon, Link2, Save, Loader2, X } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const MOODS = ["😊", "😔", "😰", "😡", "😌", "🥰", "😴", "🤔", "😢", "🎉", "😤", "😇"];

function NewEntryContent() {
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const router = useRouter();
  const [mood, setMood] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const t = {
    en: { title: "New Journal Entry", back: "Back to Journal", mood: "How are you feeling?", writeHere: "Write about your day, feelings, thoughts...", addLink: "Add a Link (video, article, podcast...)", linkTitle: "Link title (optional)", addImage: "Add Image", save: "Save Entry", saving: "Saving..." },
    es: { title: "Nueva Entrada de Diario", back: "Volver al Diario", mood: "¿Cómo te sientes?", writeHere: "Escribe sobre tu día, sentimientos, pensamientos...", addLink: "Agregar un enlace (video, artículo, podcast...)", linkTitle: "Título del enlace (opcional)", addImage: "Agregar Imagen", save: "Guardar Entrada", saving: "Guardando..." },
  }[language];

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSave() {
    if (!user || (!text.trim() && !mood && !imageFile && !linkUrl)) {
      toast.error(language === "es" ? "Agrega algo a tu entrada" : "Add something to your entry");
      return;
    }
    setSaving(true);
    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const storageRef = ref(storage, `journals/${user.uid}/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      await addJournalEntry(user.uid, {
        mood,
        text: text.trim(),
        imageUrl,
        linkUrl: linkUrl.trim() || undefined,
        linkTitle: linkTitle.trim() || undefined,
      });
      toast.success(language === "es" ? "Entrada guardada" : "Entry saved");
      router.push("/journal");
    } catch {
      toast.error(language === "es" ? "Error al guardar" : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/journal">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.title}</h1>
      </div>

      {/* Mood */}
      <div className="space-y-2">
        <Label className="text-sm">{t.mood}</Label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <button
              key={m}
              onClick={() => setMood(m === mood ? null : m)}
              className={`text-2xl p-1.5 rounded-lg transition-all ${m === mood ? "bg-primary/20 scale-125" : "hover:bg-muted"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Text */}
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.writeHere}
        rows={8}
        className="resize-none"
      />

      {/* Image */}
      <div className="space-y-2">
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        <Button type="button" variant="outline" size="sm" className="gap-1.5" onClick={() => fileRef.current?.click()}>
          <ImageIcon className="h-4 w-4" />
          {t.addImage}
        </Button>
        {imagePreview && (
          <div className="relative inline-block">
            <img src={imagePreview} alt="Preview" className="max-h-48 rounded-xl object-cover" />
            <button
              onClick={() => { setImageFile(null); setImagePreview(null); }}
              className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Link */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-1.5"><Link2 className="h-3.5 w-3.5" />{t.addLink}</Label>
        <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="https://..." type="url" />
        {linkUrl && (
          <Input value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)} placeholder={t.linkTitle} />
        )}
      </div>

      <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? t.saving : t.save}
      </Button>
    </div>
  );
}

export default function NewJournalPage() {
  return <AuthGuard><NewEntryContent /></AuthGuard>;
}
