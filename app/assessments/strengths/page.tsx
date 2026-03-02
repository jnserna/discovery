"use client";

import { useState } from "react";
import { QuizEngine } from "@/components/assessments/QuizEngine";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import { getStrengthsQuestions, scoreStrengths } from "@/lib/assessments/strengths";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import Link from "next/link";

export default function StrengthsPage() {
  const [result, setResult] = useState<{ strength: string; score: number }[] | null>(null);
  const { language } = useGlobalContext();
  const { user } = useAuthState();
  const questions = getStrengthsQuestions(language);

  async function handleComplete(answers: Record<string, string | number>) {
    const top5 = scoreStrengths(answers);
    setResult(top5);
    if (user) await saveAssessmentResult(user.uid, "strengths", { top5 });
  }

  const t = {
    en: { title: "Strengths Finder", subtitle: "20 questions to identify your top character strengths.", back: "Back to Assessments", retake: "Retake", result: "Your Top 5 Strengths" },
    es: { title: "Descubridor de Fortalezas", subtitle: "20 preguntas para identificar tus principales fortalezas de carácter.", back: "Volver a Evaluaciones", retake: "Repetir", result: "Tus 5 Fortalezas Principales" },
  }[language];

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.result}</h1>
        <div className="space-y-3">
          {result.map((s, i) => (
            <Card key={s.strength} className={i === 0 ? "border-primary/40 bg-primary/5" : ""}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Star className={`h-4 w-4 ${i === 0 ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{s.strength}</p>
                </div>
                {i === 0 && <Badge>Top Strength</Badge>}
              </CardContent>
            </Card>
          ))}
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
