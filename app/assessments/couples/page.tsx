"use client";

import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Users } from "lucide-react";
import Link from "next/link";

export default function CouplesPage() {
  const { language, enneatype, attachmentStyle, loveLanguages } = useGlobalContext();

  const t = {
    en: {
      title: "Couples",
      subtitle: "Tools for compatibility and relationship insights.",
      back: "Back to Assessments",
      compatibility: {
        title: "Compatibility Profile",
        desc: "Based on your assessment results, see how you tend to match with different types.",
        cta: "View My Compatibility",
        noData: "Complete the Enneagram and Attachment assessments first to unlock your compatibility profile.",
      },
      desire: {
        title: "Desire Profile",
        desc: "Based on your personality, discover what kind of partner would be highly compatible with you.",
        cta: "See My Ideal Profile",
        noData: "Complete at least the Enneagram assessment to unlock this section.",
      },
    },
    es: {
      title: "Parejas",
      subtitle: "Herramientas para compatibilidad y perspectivas de relaciones.",
      back: "Volver a Evaluaciones",
      compatibility: {
        title: "Perfil de Compatibilidad",
        desc: "Basado en tus resultados de evaluación, ve cómo tiendes a coincidir con diferentes tipos.",
        cta: "Ver Mi Compatibilidad",
        noData: "Completa las evaluaciones de Eneagrama y Apego primero para desbloquear tu perfil de compatibilidad.",
      },
      desire: {
        title: "Perfil de Deseos",
        desc: "Basado en tu personalidad, descubre qué tipo de pareja sería altamente compatible contigo.",
        cta: "Ver Mi Perfil Ideal",
        noData: "Completa al menos la evaluación de Eneagrama para desbloquear esta sección.",
      },
    },
  }[language];

  const hasEnneagram = enneatype !== null;
  const hasAttachment = attachmentStyle !== null;
  const hasData = hasEnneagram && hasAttachment;

  const compatibilityInsight = hasData
    ? getCompatibilityInsight(enneatype!, attachmentStyle!, language)
    : null;

  const desireInsight = hasEnneagram
    ? getDesireProfile(enneatype!, language)
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link href="/assessments">
        <Button variant="ghost" size="sm" className="gap-1 -ml-2"><ArrowLeft className="h-4 w-4" />{t.back}</Button>
      </Link>
      <div>
        <h1 className="text-2xl font-bold mb-1">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Compatibility */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">{t.compatibility.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t.compatibility.desc}</p>
          {compatibilityInsight ? (
            <div className="bg-muted/40 rounded-xl p-4 text-sm leading-relaxed">{compatibilityInsight}</div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
              {t.compatibility.noData}
              <div className="flex gap-2 mt-3">
                {!hasEnneagram && (
                  <Link href="/assessments/enneagram">
                    <Button size="sm" variant="outline">Enneagram →</Button>
                  </Link>
                )}
                {!hasAttachment && (
                  <Link href="/assessments/attachment">
                    <Button size="sm" variant="outline">Attachment →</Button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Desire Profile */}
      <Card>
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            <h2 className="font-semibold">{t.desire.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">{t.desire.desc}</p>
          {desireInsight ? (
            <div className="bg-muted/40 rounded-xl p-4 text-sm leading-relaxed">{desireInsight}</div>
          ) : (
            <div className="bg-muted/30 rounded-xl p-4 text-sm text-muted-foreground">
              {t.desire.noData}
              <div className="mt-3">
                <Link href="/assessments/enneagram">
                  <Button size="sm" variant="outline">Take Enneagram →</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function getCompatibilityInsight(enneatype: number, attachmentStyle: string, lang: "en" | "es"): string {
  const compatibleTypes: Record<number, number[]> = {
    1: [7, 2, 6], 2: [8, 4, 1], 3: [6, 9, 3], 4: [5, 9, 1],
    5: [4, 1, 8], 6: [9, 2, 3], 7: [5, 1, 3], 8: [2, 9, 5], 9: [3, 6, 2],
  };
  const compatible = compatibleTypes[enneatype] ?? [];

  if (lang === "es") {
    return `Como Tipo ${enneatype} con apego ${attachmentStyle}, tiendes a conectar bien con Tipos ${compatible.join(", ")}. Las personas con estos tipos complementan tus fortalezas y apoyan tu crecimiento. Busca a alguien que respete tu forma única de amar y te apoye en tus áreas de crecimiento.`;
  }
  return `As a Type ${enneatype} with ${attachmentStyle} attachment, you tend to connect well with Types ${compatible.join(", ")}. People with these types complement your strengths and support your growth. Look for someone who respects your unique way of loving and supports you in your growth areas.`;
}

function getDesireProfile(enneatype: number, lang: "en" | "es"): string {
  const profiles: Record<number, { en: string; es: string }> = {
    1: { en: "You thrive with a partner who is grounded, accepting, and brings lightness to your life. Someone who appreciates your high standards while gently reminding you that you're already enough.", es: "Prosperas con una pareja que esté arraigada, sea aceptante y traiga ligereza a tu vida. Alguien que aprecie tus altos estándares mientras te recuerda suavemente que ya eres suficiente." },
    2: { en: "You flourish with someone who loves you generously and makes sure you feel cared for in return. A partner who sees your needs without you having to hide them.", es: "Floreces con alguien que te ame generosamente y se asegure de que te sientas cuidado/a a cambio. Una pareja que vea tus necesidades sin que tengas que ocultarlas." },
    3: { en: "You need a partner who loves you for who you are, not just what you achieve. Someone who creates a safe space for you to slow down and just be.", es: "Necesitas una pareja que te ame por quien eres, no solo por lo que logras. Alguien que cree un espacio seguro para que puedas desacelerar y simplemente ser." },
    4: { en: "You need someone who can hold space for your emotional depth without trying to fix it. A partner who finds your uniqueness magnetic, not overwhelming.", es: "Necesitas a alguien que pueda sostener tu profundidad emocional sin intentar arreglarla. Una pareja que encuentre tu singularidad magnética, no abrumadora." },
    5: { en: "You connect deeply with someone who respects your need for space and doesn't take your solitude personally. Someone intellectually stimulating who doesn't demand constant emotional availability.", es: "Conectas profundamente con alguien que respete tu necesidad de espacio y no tome tu solitud personalmente. Alguien intelectualmente estimulante que no exija disponibilidad emocional constante." },
    6: { en: "You flourish with a consistent, trustworthy partner who shows up reliably. Someone who doesn't take your anxiety personally and helps you feel safe through their steady presence.", es: "Floreces con una pareja consistente y confiable que aparece de manera fiable. Alguien que no tome tu ansiedad personalmente y te ayude a sentirte seguro/a a través de su presencia estable." },
    7: { en: "You thrive with someone adventurous and open-minded who can also gently help you process the difficult emotions you tend to avoid. A partner who is your best adventure buddy AND a safe landing place.", es: "Prosperas con alguien aventurero/a y de mente abierta que también pueda ayudarte suavemente a procesar las emociones difíciles que tiendes a evitar. Una pareja que sea tu mejor compañero/a de aventuras Y un lugar seguro." },
    8: { en: "You need a partner who is strong enough to stand their ground with you — someone you can respect. Equally, someone who creates safety for your rarely-seen vulnerability to emerge.", es: "Necesitas una pareja que sea lo suficientemente fuerte como para mantenerse firme contigo — alguien a quien puedas respetar. Igualmente, alguien que cree seguridad para que emerja tu vulnerabilidad raramente vista." },
    9: { en: "You flourish with someone who actively invites your preferences, opinions, and desires — who wants to know what YOU want. A partner who helps you wake up to your own importance.", es: "Floreces con alguien que invite activamente tus preferencias, opiniones y deseos — que quiera saber qué quieres TÚ. Una pareja que te ayude a despertar a tu propia importancia." },
  };

  return lang === "es" ? profiles[enneatype]?.es ?? "" : profiles[enneatype]?.en ?? "";
}
