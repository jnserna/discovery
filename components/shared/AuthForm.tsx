"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Chrome } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2),
});

type LoginData = z.infer<typeof loginSchema>;
type SignupData = z.infer<typeof signupSchema>;

interface AuthFormProps {
  compact?: boolean;
  defaultMode?: "login" | "signup";
}

export function AuthForm({ compact = false, defaultMode = "login" }: AuthFormProps) {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useGlobalContext();

  const t = {
    en: {
      login: "Sign In",
      signup: "Create Account",
      email: "Email",
      password: "Password",
      name: "Full Name",
      google: "Continue with Google",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      signupLink: "Create one",
      loginLink: "Sign in",
      or: "or",
    },
    es: {
      login: "Iniciar Sesión",
      signup: "Crear Cuenta",
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre Completo",
      google: "Continuar con Google",
      noAccount: "¿No tienes cuenta?",
      haveAccount: "¿Ya tienes cuenta?",
      signupLink: "Créala",
      loginLink: "Inicia sesión",
      or: "o",
    },
  }[language];

  const isSignup = mode === "signup";

  const form = useForm<SignupData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(isSignup ? signupSchema : loginSchema) as any,
  });

  async function onSubmit(data: SignupData) {
    setLoading(true);
    setError(null);
    try {
      if (isSignup) {
        await signUpWithEmail(data.email, data.password, data.name ?? "");
      } else {
        await signInWithEmail(data.email, data.password);
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Authentication failed";
      setError(msg.replace("Firebase: ", "").replace(/\(auth\/.*\)/, "").trim());
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Google sign-in failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "p-4 space-y-3" : "space-y-4"}>
      {!compact && (
        <h2 className="text-lg font-semibold text-center">
          {isSignup ? t.signup : t.login}
        </h2>
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2 text-sm"
        onClick={handleGoogle}
        disabled={loading}
      >
        <Chrome className="h-4 w-4" />
        {t.google}
      </Button>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">{t.or}</span>
        <Separator className="flex-1" />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {isSignup && (
          <div className="space-y-1">
            <Label className="text-xs">{t.name}</Label>
            <Input
              {...form.register("name")}
              placeholder="Jane Doe"
              className="h-8 text-sm"
              disabled={loading}
            />
          </div>
        )}

        <div className="space-y-1">
          <Label className="text-xs">{t.email}</Label>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="you@example.com"
            className="h-8 text-sm"
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs">{t.password}</Label>
          <Input
            {...form.register("password")}
            type="password"
            placeholder="••••••••"
            className="h-8 text-sm"
            disabled={loading}
            autoComplete={isSignup ? "new-password" : "current-password"}
          />
        </div>

        {error && (
          <p className="text-xs text-destructive bg-destructive/10 rounded px-2 py-1">{error}</p>
        )}

        <Button type="submit" className="w-full h-8 text-sm" disabled={loading}>
          {loading && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
          {isSignup ? t.signup : t.login}
        </Button>
      </form>

      <p className="text-xs text-center text-muted-foreground">
        {isSignup ? t.haveAccount : t.noAccount}{" "}
        <button
          type="button"
          onClick={() => {
            setMode(isSignup ? "login" : "signup");
            setError(null);
            form.reset();
          }}
          className="text-primary hover:underline font-medium"
        >
          {isSignup ? t.loginLink : t.signupLink}
        </button>
      </p>
    </div>
  );
}
