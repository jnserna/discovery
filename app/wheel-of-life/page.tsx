"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "@/lib/firebase/auth";
import { saveWheelSnapshot, getWheelSnapshots } from "@/lib/firebase/db";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const lifeAreas = {
  en: ["Career", "Finances", "Health", "Family", "Romance", "Personal Growth", "Fun", "Environment"],
  es: ["Carrera", "Finanzas", "Salud", "Familia", "Romance", "Crecimiento Personal", "Diversión", "Entorno"],
};

function WheelContent() {
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState(false);
  const areas = lifeAreas[language];

  const t = {
    en: { title: "Wheel of Life", subtitle: "Rate your current satisfaction in each life area (1–10).", save: "Save Snapshot", saving: "Saving...", saved: "Snapshot saved!" },
    es: { title: "Rueda de la Vida", subtitle: "Califica tu satisfacción actual en cada área de vida (1–10).", save: "Guardar Instantánea", saving: "Guardando...", saved: "¡Instantánea guardada!" },
  }[language];

  // Initialize scores
  useEffect(() => {
    const initial: Record<string, number> = {};
    areas.forEach((a) => (initial[a] = 5));
    setScores(initial);
  }, [language]);

  const chartData = areas.map((area) => ({ area, score: scores[area] ?? 5 }));

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await saveWheelSnapshot(user.uid, scores);
      toast.success(t.saved);
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Radar Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="area" tick={{ fontSize: 11 }} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        {areas.map((area) => (
          <div key={area} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">{area}</label>
              <span className="text-sm font-bold text-primary">{scores[area] ?? 5}</span>
            </div>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[scores[area] ?? 5]}
              onValueChange={([v]) => setScores((prev) => ({ ...prev, [area]: v }))}
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>

      <Button onClick={handleSave} className="w-full gap-2" disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {saving ? t.saving : t.save}
      </Button>
    </div>
  );
}

export default function WheelOfLifePage() {
  return <AuthGuard><WheelContent /></AuthGuard>;
}
