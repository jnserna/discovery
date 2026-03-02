"use client";

import { useState } from "react";
import { QuizEngine } from "@/components/assessments/QuizEngine";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import { attachmentQuestions, attachmentDescriptions, scoreAttachment } from "@/lib/assessments/attachment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function AttachmentPage() {
  const [result, setResult] = useState<string | null>(null);
  const { language, setAttachmentStyle } = useGlobalContext();
  const { user } = useAuthState();

  const questions = attachmentQuestions.map((q) => ({
    id: q.id,
    text: language === "es" ? q.textEs : q.text,
    options: q.options.map((o) => ({
      label: language === "es" ? o.labelEs : o.label,
      value: language === "es" ? o.labelEs : o.label,
    })),
  }));

  async function handleComplete(answers: Record<string, string | number>) {
    const style = scoreAttachment(answers);
    setResult(style);
    setAttachmentStyle(style);
    if (user) await saveAssessmentResult(user.uid, "attachment", { style, answers });
  }

  const t = {
    en: { title: "Attachment Style", subtitle: "15 questions to understand how you connect in relationships.", back: "Back to Assessments", retake: "Retake" },
    es: { title: "Estilo de Apego", subtitle: "15 preguntas para entender cómo te conectas en las relaciones.", back: "Volver a Evaluaciones", retake: "Repetir" },
  }[language];

  if (result) {
    const desc = attachmentDescriptions[result as keyof typeof attachmentDescriptions];
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
        </Link>
        <Card className="overflow-hidden">
          <div className="h-2" style={{ backgroundColor: desc.color }} />
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Your Attachment Style</p>
            <h1 className="text-3xl font-bold mb-4" style={{ color: desc.color }}>
              {language === "es" ? desc.nameEs : desc.name}
            </h1>
            <p className="text-muted-foreground leading-relaxed">{language === "es" ? desc.es : desc.en}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-5">
            <h3 className="font-semibold text-primary mb-2">💡 Growth Tip</h3>
            <p className="text-sm leading-relaxed">{language === "es" ? desc.growthEs : desc.growth}</p>
          </CardContent>
        </Card>
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
