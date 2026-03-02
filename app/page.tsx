"use client";

import Link from "next/link";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuickChat } from "@/components/chat/QuickChat";
import {
  MessageCircle,
  BookOpen,
  Brain,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const content = {
  en: {
    title: "Your Personal Psychology Companion",
    subtitle:
      "A safe, supportive space to explore your mind, understand yourself deeply, and grow — available in English and Spanish.",
    cta: "Start Talking",
    ctaSecondary: "Explore Features",
    quickChatTitle: "How are you feeling right now?",
    features: [
      {
        icon: MessageCircle,
        title: "Therapy Chat",
        description:
          "Talk with an empathetic AI companion about your feelings, fears, and thoughts. No login required.",
        href: "/chat",
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        icon: BookOpen,
        title: "Personal Journal",
        description:
          "Write about your day, emotions, and gratitude. Add photos and links to meaningful moments.",
        href: "/journal",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
      },
      {
        icon: Brain,
        title: "Know Yourself",
        description:
          "Discover your Enneagram type, attachment style, love languages, and core strengths.",
        href: "/assessments",
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-950/30",
      },
      {
        icon: User,
        title: "Personality Profile",
        description:
          "Build your unique profile and receive AI-powered psychological insights and growth suggestions.",
        href: "/profile",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-950/30",
      },
    ],
  },
  es: {
    title: "Tu Compañero Personal de Psicología",
    subtitle:
      "Un espacio seguro y de apoyo para explorar tu mente, conocerte profundamente y crecer — disponible en inglés y español.",
    cta: "Empezar a Hablar",
    ctaSecondary: "Explorar Funciones",
    quickChatTitle: "¿Cómo te sientes ahora mismo?",
    features: [
      {
        icon: MessageCircle,
        title: "Chat Terapéutico",
        description:
          "Habla con un compañero de IA empático sobre tus sentimientos, miedos y pensamientos. Sin registro.",
        href: "/chat",
        color: "text-primary",
        bg: "bg-primary/10",
      },
      {
        icon: BookOpen,
        title: "Diario Personal",
        description:
          "Escribe sobre tu día, emociones y gratitud. Agrega fotos y enlaces a momentos significativos.",
        href: "/journal",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
      },
      {
        icon: Brain,
        title: "Conócete",
        description:
          "Descubre tu tipo de Eneagrama, estilo de apego, lenguajes del amor y fortalezas principales.",
        href: "/assessments",
        color: "text-violet-600 dark:text-violet-400",
        bg: "bg-violet-50 dark:bg-violet-950/30",
      },
      {
        icon: User,
        title: "Perfil de Personalidad",
        description:
          "Construye tu perfil único y recibe perspectivas psicológicas impulsadas por IA y sugerencias de crecimiento.",
        href: "/profile",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-950/30",
      },
    ],
  },
};

export default function LandingPage() {
  const { language } = useGlobalContext();
  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-calm py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-primary tracking-tight" style={{ fontFamily: "var(--font-display)" }}>innerBloom</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              {t.title}
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="gap-2 rounded-full px-8">
                <Link href="/chat">
                  <MessageCircle className="h-4 w-4" />
                  {t.cta}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 rounded-full px-8">
                <Link href="/assessments">
                  <Sparkles className="h-4 w-4" />
                  {t.ctaSecondary}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Chat Preview */}
      <section className="py-12 px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-center text-xl font-semibold mb-6 text-foreground">
            {t.quickChatTitle}
          </h2>
          <QuickChat />
        </motion.div>
      </section>

      {/* Feature cards */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.features.map((feature, i) => (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <Link href={feature.href}>
                  <Card className="group hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 border-border/60 cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col gap-3 h-full">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.bg}`}>
                        <feature.icon className={`h-5 w-5 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-medium ${feature.color}`}>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
