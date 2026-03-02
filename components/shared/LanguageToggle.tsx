"use client";

import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
  const { language, setLanguage } = useGlobalContext();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="font-semibold text-xs tracking-wide px-2 h-8 rounded-full border border-border hover:bg-primary/10 hover:text-primary transition-colors"
      aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
    >
      {language === "en" ? "EN" : "ES"}
    </Button>
  );
}
