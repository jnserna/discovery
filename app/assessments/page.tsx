"use client";

import Link from "next/link";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Star, BarChart2, Layers, Sparkles } from "lucide-react";

const assessments = [
  {
    href: "/assessments/enneagram",
    icon: Layers,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    badge: "10 questions",
    badgeEs: "10 preguntas",
    en: { title: "Enneagram", desc: "Understand your core motivations and why you do what you do." },
    es: { title: "Eneagrama", desc: "Comprende tus motivaciones principales y por qué haces lo que haces." },
  },
  {
    href: "/assessments/attachment",
    icon: Heart,
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    badge: "15 questions",
    badgeEs: "15 preguntas",
    en: { title: "Attachment Style", desc: "Discover how you connect with others in relationships." },
    es: { title: "Estilo de Apego", desc: "Descubre cómo te conectas con los demás en las relaciones." },
  },
  {
    href: "/assessments/big-five",
    icon: BarChart2,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    badge: "20 questions",
    badgeEs: "20 preguntas",
    en: { title: "Big Five (OCEAN)", desc: "Science-backed personality traits: practical and insightful." },
    es: { title: "Los Cinco Grandes", desc: "Rasgos de personalidad respaldados por la ciencia." },
  },
  {
    href: "/assessments/love-languages",
    icon: Heart,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/30",
    badge: "15 questions",
    badgeEs: "15 preguntas",
    en: { title: "Love Languages", desc: "Find out how you give and receive love." },
    es: { title: "Lenguajes del Amor", desc: "Descubre cómo das y recibes amor." },
  },
  {
    href: "/assessments/values",
    icon: Star,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    badge: "20 values",
    badgeEs: "20 valores",
    en: { title: "Values Assessment", desc: "Rank your top personal values to understand what drives you." },
    es: { title: "Evaluación de Valores", desc: "Clasifica tus valores personales más importantes." },
  },
  {
    href: "/assessments/strengths",
    icon: Sparkles,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    badge: "20 questions",
    badgeEs: "20 preguntas",
    en: { title: "Strengths Finder", desc: "Identify your top character strengths." },
    es: { title: "Descubridor de Fortalezas", desc: "Identifica tus principales fortalezas de carácter." },
  },
  {
    href: "/assessments/couples",
    icon: Users,
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
    badge: "For couples",
    badgeEs: "Para parejas",
    en: { title: "Couples", desc: "Compatibility and desire profile tools for relationships." },
    es: { title: "Parejas", desc: "Herramientas de compatibilidad y perfil de deseos para relaciones." },
  },
];

export default function AssessmentsHub() {
  const { language } = useGlobalContext();

  const heading = language === "es" ? "Conócete" : "Know Yourself";
  const subtitle = language === "es"
    ? "Herramientas respaldadas por la ciencia para entender tu personalidad, relaciones y motivaciones."
    : "Science-backed tools to understand your personality, relationships, and motivations.";

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-3">{heading}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map((a) => {
          const text = a[language];
          return (
            <Link key={a.href} href={a.href}>
              <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full">
                <CardContent className="p-5 flex flex-col gap-3 h-full">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${a.bg}`}>
                    <a.icon className={`h-5 w-5 ${a.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{text.title}</h3>
                      <Badge variant="secondary" className="text-[10px] shrink-0">
                        {language === "es" ? a.badgeEs : a.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{text.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
