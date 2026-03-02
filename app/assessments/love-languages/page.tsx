"use client";

import { useState } from "react";
import { QuizEngine } from "@/components/assessments/QuizEngine";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import { loveLanguageQuestions, scoreLoveLanguages, loveLanguageInfo } from "@/lib/assessments/love-languages";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function LoveLanguagesPage() {
  const [result, setResult] = useState<Record<string, number> | null>(null);
  const { language, setLoveLanguages } = useGlobalContext();
  const { user } = useAuthState();

  const questions = loveLanguageQuestions.map((q) => ({
    id: q.id,
    text: language === "es" ? q.textEs : q.text,
    options: q.options.map((o) => ({
      label: language === "es" ? o.labelEs : o.label,
      value: language === "es" ? o.labelEs : o.label,
    })),
  }));

  async function handleComplete(answers: Record<string, string | number>) {
    const scores = scoreLoveLanguages(answers);
    setResult(scores);
    setLoveLanguages(scores as Parameters<typeof setLoveLanguages>[0]);
    if (user) await saveAssessmentResult(user.uid, "loveLanguages", scores);
  }

  const t = {
    en: { title: "Love Languages", subtitle: "15 questions to discover how you give and receive love.", back: "Back to Assessments", retake: "Retake", primary: "Your Primary Love Languages" },
    es: { title: "Lenguajes del Amor", subtitle: "15 preguntas para descubrir cómo das y recibes amor.", back: "Volver a Evaluaciones", retake: "Repetir", primary: "Tus Lenguajes del Amor Principales" },
  }[language];

  if (result) {
    const sorted = Object.entries(result).sort((a, b) => b[1] - a[1]);
    const total = Object.values(result).reduce((a, b) => a + b, 0) || 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.primary}</h1>
        <div className="space-y-3">
          {sorted.map(([key, count], i) => {
            const info = loveLanguageInfo[key as keyof typeof loveLanguageInfo];
            const pct = Math.round((count / total) * 100);
            return (
              <Card key={key} className={i === 0 ? "border-primary/40 bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {i === 0 && <Badge className="text-xs">Primary</Badge>}
                      <span className="font-semibold" style={{ color: info.color }}>
                        {language === "es" ? info.es.name : info.en.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: info.color }}>{pct}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === "es" ? info.es.desc : info.en.desc}
                  </p>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: info.color }} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button variant="outline" onClick={() => setResult(null)} className="w-full gap-2">
          <RotateCcw className="h-4 w-4" />{t.retake}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/assessments">
        <Button variant="ghost" size="sm" className="gap-1 -ml-2 mb-4"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
      </Link>
      <h1 className="text-2xl font-bold mb-2">{t.title}</h1>
      <p className="text-muted-foreground mb-8">{t.subtitle}</p>
      <QuizEngine questions={questions} onComplete={handleComplete} />
    </div>
  );
}
