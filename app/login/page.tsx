import { AuthForm } from "@/components/shared/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-primary tracking-tight">innerBloom</span>
          <p className="text-sm text-muted-foreground mt-1">Your personal psychology companion</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
