"use client";

import { useState } from "react";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import Link from "next/link";

const valuesData = [
  { en: "Authenticity", es: "Autenticidad" },
  { en: "Adventure", es: "Aventura" },
  { en: "Balance", es: "Equilibrio" },
  { en: "Compassion", es: "Compasión" },
  { en: "Creativity", es: "Creatividad" },
  { en: "Excellence", es: "Excelencia" },
  { en: "Family", es: "Familia" },
  { en: "Freedom", es: "Libertad" },
  { en: "Growth", es: "Crecimiento" },
  { en: "Harmony", es: "Armonía" },
  { en: "Honesty", es: "Honestidad" },
  { en: "Humor", es: "Humor" },
  { en: "Impact", es: "Impacto" },
  { en: "Integrity", es: "Integridad" },
  { en: "Justice", es: "Justicia" },
  { en: "Kindness", es: "Bondad" },
  { en: "Leadership", es: "Liderazgo" },
  { en: "Love", es: "Amor" },
  { en: "Loyalty", es: "Lealtad" },
  { en: "Mindfulness", es: "Atención Plena" },
];

export default function ValuesPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const { language } = useGlobalContext();
  const { user } = useAuthState();

  const t = {
    en: {
      title: "Values Assessment",
      subtitle: "Select your top 10 personal values.",
      instruction: "Click to select up to 10 values that resonate most with who you are.",
      selected: `${selected.length}/10 selected`,
      submit: "Save My Values",
      retake: "Retake",
      back: "Back to Assessments",
      result: "Your Top Values",
      resultSub: "These are the core values that guide who you are and how you live.",
    },
    es: {
      title: "Evaluación de Valores",
      subtitle: "Selecciona tus 10 valores personales principales.",
      instruction: "Haz clic para seleccionar hasta 10 valores que resuenen más con quien eres.",
      selected: `${selected.length}/10 seleccionados`,
      submit: "Guardar Mis Valores",
      retake: "Repetir",
      back: "Volver a Evaluaciones",
      result: "Tus Valores Principales",
      resultSub: "Estos son los valores fundamentales que guían quién eres y cómo vives.",
    },
  }[language];

  function toggle(value: string) {
    setSelected((prev) => {
      if (prev.includes(value)) return prev.filter((v) => v !== value);
      if (prev.length >= 10) return prev;
      return [...prev, value];
    });
  }

  async function handleSubmit() {
    if (selected.length < 1) return;
    if (user) await saveAssessmentResult(user.uid, "values", { topValues: selected });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.result}</h1>
        <p className="text-muted-foreground">{t.resultSub}</p>
        <div className="flex flex-wrap gap-2">
          {selected.map((v, i) => (
            <Badge key={v} className="text-sm px-3 py-1.5 gap-1.5">
              <span className="font-bold text-xs opacity-60">#{i + 1}</span> {v}
            </Badge>
          ))}
        </div>
        <Button variant="outline" onClick={() => { setSelected([]); setSubmitted(false); }} className="w-full gap-2">
          <RotateCcw className="h-4 w-4" />{t.retake}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/assessments">
        <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
      </Link>
      <div>
        <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
        <p className="text-muted-foreground mb-1">{t.subtitle}</p>
        <p className="text-xs text-muted-foreground">{t.instruction}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{t.selected}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {valuesData.map((v) => {
          const label = language === "es" ? v.es : v.en;
          const isSelected = selected.includes(label);
          return (
            <button
              key={label}
              onClick={() => toggle(label)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm text-left transition-all ${
                isSelected
                  ? "border-primary bg-primary/10 text-primary font-medium"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              } ${!isSelected && selected.length >= 10 ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={!isSelected && selected.length >= 10}
            >
              {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              {label}
            </button>
          );
        })}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className="w-full"
      >
        {t.submit}
      </Button>
    </div>
  );
}
