"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { MessageCircle, BookOpen, Brain, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = {
  en: [
    { href: "/", label: "Home", icon: Home },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/assessments", label: "Know You", icon: Brain },
    { href: "/profile", label: "Profile", icon: User },
  ],
  es: [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/journal", label: "Diario", icon: BookOpen },
    { href: "/assessments", label: "Conócete", icon: Brain },
    { href: "/profile", label: "Perfil", icon: User },
  ],
};

export function MobileNav() {
  const pathname = usePathname();
  const { language } = useGlobalContext();
  const items = navItems[language];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-t border-border safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-0",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium leading-none truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
