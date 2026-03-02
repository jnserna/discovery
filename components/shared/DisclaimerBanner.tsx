"use client";

import { useState } from "react";
import { X, Info } from "lucide-react";
import { useGlobalContext } from "@/lib/context/GlobalContext";

const text = {
  en: "innerBloom is not a replacement for professional therapy. If you are in crisis, please contact a mental health professional.",
  es: "innerBloom no reemplaza la terapia profesional. Si estás en crisis, por favor contacta a un profesional de salud mental.",
};

export function DisclaimerBanner() {
  const [dismissed, setDismissed] = useState(false);
  const { language } = useGlobalContext();

  if (dismissed) return null;

  return (
    <div className="bg-secondary/60 border-b border-border px-4 py-2 flex items-center gap-2 text-xs text-muted-foreground">
      <Info className="h-3.5 w-3.5 shrink-0 text-primary" />
      <p className="flex-1">{text[language]}</p>
      <button
        onClick={() => setDismissed(true)}
        className="shrink-0 hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
