"use client";

import { useState } from "react";
import { QuizEngine } from "@/components/assessments/QuizEngine";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { useAuthState } from "@/lib/firebase/auth";
import { saveAssessmentResult } from "@/lib/firebase/db";
import {
  enneagramQuestions,
  enneagramTypes,
  typeDescriptions,
  scoreEnneagram,
} from "@/lib/assessments/enneagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function EnneagramPage() {
  const [result, setResult] = useState<number | null>(null);
  const { language, setEnneatype } = useGlobalContext();
  const { user } = useAuthState();

  const questions = enneagramQuestions.map((q) => ({
    id: q.id,
    text: language === "es" ? q.textEs : q.text,
    options: q.options.map((o) => ({
      label: language === "es" ? o.labelEs : o.label,
      value: language === "es" ? o.labelEs : o.label,
    })),
  }));

  async function handleComplete(answers: Record<string, string | number>) {
    const type = scoreEnneagram(answers);
    setResult(type);
    setEnneatype(type);

    if (user) {
      await saveAssessmentResult(user.uid, "enneagram", {
        type,
        answers,
      });
    }
  }

  const t = {
    en: {
      title: "Enneagram Assessment",
      subtitle: "Discover your Enneagram type through 10 reflective questions.",
      backLabel: "Back to Assessments",
      retake: "Retake Assessment",
      typeLabel: "Your Enneagram Type",
      wingsLabel: "Wing Tendencies",
      growthLabel: "Your Growth Direction",
      stressLabel: "Your Stress Direction",
      strengthsLabel: "Core Strengths",
      challengesLabel: "Key Challenges",
      growthTipLabel: "Growth Tip",
      compatibleLabel: "Most Compatible Types",
    },
    es: {
      title: "Evaluación del Eneagrama",
      subtitle: "Descubre tu tipo de Eneagrama a través de 10 preguntas reflexivas.",
      backLabel: "Volver a Evaluaciones",
      retake: "Repetir Evaluación",
      typeLabel: "Tu Tipo de Eneagrama",
      wingsLabel: "Tendencias de Alas",
      growthLabel: "Tu Dirección de Crecimiento",
      stressLabel: "Tu Dirección de Estrés",
      strengthsLabel: "Fortalezas Principales",
      challengesLabel: "Desafíos Clave",
      growthTipLabel: "Consejo de Crecimiento",
      compatibleLabel: "Tipos Más Compatibles",
    },
  }[language];

  if (result) {
    const typeData = enneagramTypes.find((t) => t.type === result)!;
    const desc = typeDescriptions[result];
    const wingType1 = enneagramTypes.find((t) => t.type === typeData.wing1);
    const wingType2 = enneagramTypes.find((t) => t.type === typeData.wing2);
    const growthType = enneagramTypes.find((t) => t.type === typeData.growth);
    const stressType = enneagramTypes.find((t) => t.type === typeData.stress);

    // Compatible types: growth type + adjacent types tend to work well
    const compatible = [typeData.wing1, typeData.wing2, typeData.growth].filter(Boolean);

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2 mb-2">
            <ArrowLeft className="h-4 w-4" />
            {t.backLabel}
          </Button>
        </Link>

        {/* Type header */}
        <Card className="overflow-hidden">
          <div className="h-2" style={{ backgroundColor: typeData.color }} />
          <CardContent className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              {t.typeLabel}
            </p>
            <h1 className="text-3xl font-bold mb-1" style={{ color: typeData.color }}>
              Type {typeData.type}
            </h1>
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {language === "es" ? typeData.nameEs : typeData.name}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {language === "es" ? desc.es : desc.en}
            </p>
          </CardContent>
        </Card>

        {/* Wings */}
        <Card>
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold">{t.wingsLabel}</h3>
            <div className="flex gap-3">
              {[wingType1, wingType2].map((w) => w && (
                <div key={w.type} className="flex-1 rounded-xl p-3 border border-border bg-muted/30 text-center">
                  <p className="text-2xl font-bold" style={{ color: w.color }}>{w.type}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {language === "es" ? w.nameEs : w.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth & Stress arrows */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                ↑ {t.growthLabel}
              </p>
              <p className="text-2xl font-bold text-foreground">{growthType?.type}</p>
              <p className="text-xs text-muted-foreground">
                {language === "es" ? growthType?.nameEs : growthType?.name}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">
                ↓ {t.stressLabel}
              </p>
              <p className="text-2xl font-bold text-foreground">{stressType?.type}</p>
              <p className="text-xs text-muted-foreground">
                {language === "es" ? stressType?.nameEs : stressType?.name}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Strengths & Challenges */}
        <Card>
          <CardContent className="p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
                ✓ {t.strengthsLabel}
              </h3>
              <div className="flex flex-wrap gap-2">
                {desc.strengths.map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-rose-600 dark:text-rose-400 mb-2">
                ⚡ {t.challengesLabel}
              </h3>
              <div className="flex flex-wrap gap-2">
                {desc.challenges.map((c) => (
                  <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth tip */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-5">
            <h3 className="font-semibold text-primary mb-2">💡 {t.growthTipLabel}</h3>
            <p className="text-sm text-foreground leading-relaxed">{desc.growth}</p>
          </CardContent>
        </Card>

        {/* Compatible types */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-3">{t.compatibleLabel}</h3>
            <div className="flex gap-3">
              {compatible.map((typeNum) => {
                const td = enneagramTypes.find((t) => t.type === typeNum);
                return td ? (
                  <div key={typeNum} className="flex-1 text-center rounded-xl border border-border p-3">
                    <p className="text-xl font-bold" style={{ color: td.color }}>{td.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {language === "es" ? td.nameEs : td.name}
                    </p>
                  </div>
                ) : null;
              })}
            </div>
          </CardContent>
        </Card>

        <Button
          variant="outline"
          onClick={() => setResult(null)}
          className="w-full gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {t.retake}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/assessments">
          <Button variant="ghost" size="sm" className="gap-1 -ml-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            {t.backLabel}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      <QuizEngine questions={questions} onComplete={handleComplete} />
    </div>
  );
}
