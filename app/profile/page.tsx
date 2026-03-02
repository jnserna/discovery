"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveUserProfile } from "@/lib/firebase/db";
import { getZodiacSign, zodiacEmojis } from "@/lib/utils/zodiac";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Star, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const profileSchema = z.object({
  gender: z.string().optional(),
  birthday: z.string().optional(),
  livingEnvironment: z.string().optional(),
  education: z.string().optional(),
  sports: z.string().optional(),
  hobbies: z.string().optional(),
  relationship: z.string().optional(),
  career: z.string().optional(),
  enneatype: z.string().optional(),
  favoriteSinger: z.string().optional(),
  favoriteMovie: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { language, setProfile, setZodiacSign, enneatype } = useGlobalContext();
  const { user } = useAuthState();
  const [zodiac, setZodiac] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, unknown>>({});
  const [horoscopeText, setHoroscopeText] = useState<string | null>(null);
  const [horoscopeLoading, setHoroscopeLoading] = useState(false);
  const [insightText, setInsightText] = useState("");
  const [insightsLoading, setInsightsLoading] = useState(false);
  const insightsRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title: "Personality Profile",
      subtitle: "Build your profile for personalized AI-powered psychological insights.",
      gender: "Gender (optional)",
      genderOptions: ["Prefer not to say", "Male", "Female", "Non-binary", "Other"],
      birthday: "Birthday",
      living: "Living Environment",
      livingOptions: ["City", "Suburban", "Countryside", "Small town"],
      education: "Education Level",
      educationOptions: ["High school", "Some college", "Bachelor's", "Master's", "Doctorate", "Vocational"],
      sports: "Favorite Sport / Physical Activity",
      hobbies: "Hobbies & Interests (comma-separated)",
      relationship: "Relationship Status (optional)",
      relationshipOptions: ["Prefer not to say", "Single", "In a relationship", "Married", "Divorced", "Widowed"],
      career: "Career / Work Situation",
      enneatype: "Enneatype (optional)",
      enneatypeLink: "Don't know your Enneatype? Find out →",
      singer: "Absolute Favorite Singer",
      movie: "Absolute Favorite Movie",
      generate: "Generate My Insights",
      save: "Save Profile",
      horoscope: "✨ Get My Horoscope",
      zodiacLabel: "Your Zodiac Sign",
      insightsTitle: "Your Personality Insights",
      saving: "Saving...",
      saved: "Profile saved!",
    },
    es: {
      title: "Perfil de Personalidad",
      subtitle: "Construye tu perfil para perspectivas psicológicas personalizadas impulsadas por IA.",
      gender: "Género (opcional)",
      genderOptions: ["Prefiero no decir", "Masculino", "Femenino", "No binario", "Otro"],
      birthday: "Fecha de Nacimiento",
      living: "Entorno de Vida",
      livingOptions: ["Ciudad", "Suburbio", "Campo", "Pueblo pequeño"],
      education: "Nivel Educativo",
      educationOptions: ["Bachillerato", "Algo de universidad", "Licenciatura", "Maestría", "Doctorado", "Vocacional"],
      sports: "Deporte / Actividad Física Favorita",
      hobbies: "Pasatiempos e Intereses (separados por coma)",
      relationship: "Estado de Relación (opcional)",
      relationshipOptions: ["Prefiero no decir", "Soltero/a", "En una relación", "Casado/a", "Divorciado/a", "Viudo/a"],
      career: "Situación Laboral",
      enneatype: "Eneagrama (opcional)",
      enneatypeLink: "¿No conoces tu Eneagrama? Descúbrelo →",
      singer: "Cantante Favorito Absoluto",
      movie: "Película Favorita Absoluta",
      generate: "Generar Mis Perspectivas",
      save: "Guardar Perfil",
      horoscope: "✨ Ver Mi Horóscopo",
      zodiacLabel: "Tu Signo del Zodiaco",
      insightsTitle: "Tus Perspectivas de Personalidad",
      saving: "Guardando...",
      saved: "¡Perfil guardado!",
    },
  }[language];

  const { register, handleSubmit, watch, setValue } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { enneatype: enneatype?.toString() },
  });

  const birthday = watch("birthday");

  // Compute zodiac when birthday changes
  if (birthday) {
    const sign = getZodiacSign(birthday);
    if (sign && sign !== zodiac) {
      setZodiac(sign);
      setZodiacSign(sign);
    }
  }

  async function onSubmit(data: ProfileData) {
    const profile = {
      ...data,
      hobbies: data.hobbies?.split(",").map((h) => h.trim()).filter(Boolean) ?? [],
      zodiacSign: zodiac,
      language,
    };
    setProfileData(profile);
    setProfile({
      gender: data.gender,
      birthday: data.birthday,
      livingEnvironment: data.livingEnvironment,
      education: data.education,
      sports: data.sports,
      hobbies: profile.hobbies,
      relationship: data.relationship,
      career: data.career,
      enneatype: data.enneatype ? parseInt(data.enneatype) : undefined,
      favoriteSinger: data.favoriteSinger,
      favoriteMovie: data.favoriteMovie,
    });

    setShowInsights(true);
    setTimeout(() => insightsRef.current?.scrollIntoView({ behavior: "smooth" }), 200);

    // Stream personality insights
    setInsightsLoading(true);
    setInsightText("");
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, language }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let text = "";
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          text += decoder.decode(value);
          setInsightText(text);
        }
      }
    } catch {
      toast.error("Failed to generate insights");
    } finally {
      setInsightsLoading(false);
    }
  }

  async function handleSave() {
    if (!user) { toast.error("Sign in to save your profile"); return; }
    try {
      await saveUserProfile(user.uid, profileData);
      toast.success(t.saved);
    } catch {
      toast.error("Failed to save");
    }
  }

  async function handleHoroscope() {
    if (!zodiac) return;
    setHoroscopeLoading(true);
    setHoroscopeText(null);
    try {
      const res = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zodiacSign: zodiac, language }),
      });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value);
      }
      // Extract text from AI stream format
      const textMatch = text.match(/0:"([^"]+)"/g);
      if (textMatch) {
        setHoroscopeText(textMatch.map((m) => m.replace(/0:"/, "").replace(/"$/, "").replace(/\\n/g, "\n")).join(""));
      } else {
        setHoroscopeText(text.replace(/data:.*?\n/g, "").trim());
      }
    } catch {
      toast.error("Failed to get horoscope");
    } finally {
      setHoroscopeLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Gender */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.gender}</Label>
          <Select onValueChange={(v) => setValue("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {t.genderOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Birthday + Zodiac */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.birthday}</Label>
          <Input type="date" {...register("birthday")} />
          {zodiac && (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="text-sm gap-1">
                <span>{zodiacEmojis[zodiac]}</span>
                <span>{zodiac}</span>
              </Badge>
              <Button type="button" size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={handleHoroscope} disabled={horoscopeLoading}>
                {horoscopeLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Star className="h-3 w-3" />}
                {t.horoscope}
              </Button>
            </div>
          )}
          {horoscopeText && (
            <Card className="bg-primary/5 border-primary/20 mt-2">
              <CardContent className="p-4 text-sm leading-relaxed">{horoscopeText}</CardContent>
            </Card>
          )}
        </div>

        {/* Living Environment */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.living}</Label>
          <Select onValueChange={(v) => setValue("livingEnvironment", v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {t.livingOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Education */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.education}</Label>
          <Select onValueChange={(v) => setValue("education", v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {t.educationOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Sports */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.sports}</Label>
          <Input {...register("sports")} placeholder="e.g. Swimming, yoga, cycling" />
        </div>

        {/* Hobbies */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.hobbies}</Label>
          <Input {...register("hobbies")} placeholder="e.g. Reading, cooking, photography" />
        </div>

        {/* Relationship */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.relationship}</Label>
          <Select onValueChange={(v) => setValue("relationship", v)}>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              {t.relationshipOptions.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Career */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.career}</Label>
          <Input {...register("career")} placeholder="e.g. Software engineer, freelancer, student" />
        </div>

        {/* Enneatype */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.enneatype}</Label>
          <Select onValueChange={(v) => setValue("enneatype", v)} defaultValue={enneatype?.toString()}>
            <SelectTrigger><SelectValue placeholder="Select (1-9)..." /></SelectTrigger>
            <SelectContent>
              {[1,2,3,4,5,6,7,8,9].map((n) => <SelectItem key={n} value={n.toString()}>{n}</SelectItem>)}
            </SelectContent>
          </Select>
          <Link href="/assessments/enneagram" className="text-xs text-primary hover:underline">{t.enneatypeLink}</Link>
        </div>

        {/* Favorite Singer */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.singer}</Label>
          <Input {...register("favoriteSinger")} placeholder="e.g. Adele, Bad Bunny..." />
        </div>

        {/* Favorite Movie */}
        <div className="space-y-1.5">
          <Label className="text-sm">{t.movie}</Label>
          <Input {...register("favoriteMovie")} placeholder="e.g. Eternal Sunshine of the Spotless Mind" />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={insightsLoading}>
          {insightsLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {t.generate}
        </Button>
      </form>

      {/* Insights */}
      {showInsights && (
        <div ref={insightsRef} className="space-y-4">
          <h2 className="text-xl font-semibold">{t.insightsTitle}</h2>
          {insightsLoading && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating your insights...
            </div>
          )}
          {insightText && (
            <Card className="bg-card">
              <CardContent className="p-5 prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                {insightText}
              </CardContent>
            </Card>
          )}
          {insightText && (
            <Button onClick={handleSave} variant="outline" className="w-full gap-2">
              <Save className="h-4 w-4" />
              {t.save}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
