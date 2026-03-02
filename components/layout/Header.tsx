"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthState, signOut } from "@/lib/firebase/auth";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageCircle, BookOpen, Brain, User, LogIn } from "lucide-react";
import { AuthForm } from "@/components/shared/AuthForm";
import { cn } from "@/lib/utils";

const navItems = {
  en: [
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/journal", label: "Journal", icon: BookOpen },
    { href: "/assessments", label: "Know Yourself", icon: Brain },
    { href: "/profile", label: "Profile", icon: User },
  ],
  es: [
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/journal", label: "Diario", icon: BookOpen },
    { href: "/assessments", label: "Conócete", icon: Brain },
    { href: "/profile", label: "Perfil", icon: User },
  ],
};

export function Header() {
  const pathname = usePathname();
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const items = navItems[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-primary hover:opacity-80 transition-opacity shrink-0"
        >
          <span className="text-base font-bold tracking-tight">innerBloom</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {items.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5 text-sm",
                  pathname === href && "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2 shrink-0">
          <LanguageToggle />
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                      {user.displayName?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem asChild>
                  <Link href="/goals">{language === "es" ? "Metas" : "Goals"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wheel-of-life">{language === "es" ? "Rueda de la Vida" : "Wheel of Life"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/memories">{language === "es" ? "Memorias" : "Memories"}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-destructive focus:text-destructive"
                >
                  {language === "es" ? "Cerrar Sesión" : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs h-8">
                  <LogIn className="h-3.5 w-3.5" />
                  {language === "es" ? "Iniciar sesión" : "Sign In"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <AuthForm compact />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
}
