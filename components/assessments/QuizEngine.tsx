"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalContext } from "@/lib/context/GlobalContext";

export interface QuizOption {
  label: string;
  value: string | number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (answers: Record<string, string | number>) => void;
  accentColor?: string;
}

export function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [direction, setDirection] = useState(1);
  const [selectedNow, setSelectedNow] = useState<string | number | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language } = useGlobalContext();

  const current = questions[currentIndex];
  const progress = (currentIndex / questions.length) * 100;

  const labels = {
    en: { back: "Back", progress: `${currentIndex + 1} of ${questions.length}` },
    es: { back: "Anterior", progress: `${currentIndex + 1} de ${questions.length}` },
  }[language];

  function selectOption(value: string | number) {
    if (advanceTimer.current) return; // already advancing

    setSelectedNow(value);
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);

    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      setSelectedNow(null);
      if (currentIndex === questions.length - 1) {
        onComplete(newAnswers);
      } else {
        setDirection(1);
        setCurrentIndex((i) => i + 1);
      }
    }, 320);
  }

  function goBack() {
    if (currentIndex === 0) return;
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
      setSelectedNow(null);
    }
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{labels.progress}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <p className="text-lg font-medium text-foreground mb-6 leading-relaxed">
            {current.text}
          </p>

          <div className="space-y-2.5">
            {current.options.map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => selectOption(opt.value)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-150",
                  selectedNow === opt.value
                    ? "border-primary bg-primary/20 text-primary font-medium scale-[0.99]"
                    : answers[current.id] === opt.value
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Back navigation only */}
      <div className="flex items-center mt-8">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          {labels.back}
        </Button>
      </div>
    </div>
  );
}
