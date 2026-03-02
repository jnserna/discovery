"use client";

import { useState } from "react";
import { QuizEngine } from "@/components/assessments/QuizEngine";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import { getBigFiveQuestions, scoreBigFive, traitInfo, OceanScores } from "@/lib/assessments/big-five";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function BigFivePage() {
  const [result, setResult] = useState<OceanScores | null>(null);
  const { language, setBigFive } = useGlobalContext();
  const { user } = useAuthState();
  const questions = getBigFiveQuestions(language);

  async function handleComplete(answers: Record<string, string | number>) {
    const scores = scoreBigFive(answers);
    setResult(scores);
    setBigFive({ openness: scores.O, conscientiousness: scores.C, extraversion: scores.E, agreeableness: scores.A, neuroticism: scores.N });
    if (user) await saveAssessmentResult(user.uid, "bigFive", scores as unknown as Record<string, unknown>);
  }

  const t = {
    en: { title: "Big Five Personality (OCEAN)", subtitle: "20 questions for science-backed personality insights.", back: "Back to Assessments", retake: "Retake" },
    es: { title: "Los Cinco Grandes (OCEAN)", subtitle: "20 preguntas para perspectivas de personalidad respaldadas por la ciencia.", back: "Volver a Evaluaciones", retake: "Repetir" },
  }[language];

  const traits = traitInfo[language];

  if (result) {
    const traitKeys: (keyof OceanScores)[] = ["O", "C", "E", "A", "N"];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <div className="space-y-4">
          {traitKeys.map((key) => {
            const info = traits[key];
            const score = result[key];
            return (
              <Card key={key}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold" style={{ color: info.color }}>{info.name}</p>
                      <p className="text-xs text-muted-foreground">{info.desc}</p>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: info.color }}>{score}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ width: `${score}%`, backgroundColor: info.color }}
                    />
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
