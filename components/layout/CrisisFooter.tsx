"use client";

import { useGlobalContext } from "@/lib/context/GlobalContext";

export function CrisisFooter() {
  const { language } = useGlobalContext();

  return (
    <footer className="border-t border-border bg-muted/30 py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {language === "es"
            ? "innerBloom no reemplaza la terapia profesional. Si estás en crisis, busca ayuda profesional."
            : "innerBloom is for self-reflection and is not a replacement for professional mental health care."}
        </span>
        <a
          href="#"
          className="underline underline-offset-2 hover:text-foreground transition-colors shrink-0"
        >
          {language === "es" ? "Seguridad y Privacidad Personal" : "Personal Security and Privacy"}
        </a>
      </div>
    </footer>
  );
}
