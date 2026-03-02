"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "@/lib/firebase/auth";
import { addGoal, getGoals, updateGoal, deleteGoal } from "@/lib/firebase/db";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { useGlobalContext } from "@/lib/context/GlobalContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Check, Target, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  category?: string;
  status: "active" | "done";
}

function GoalsContent() {
  const { user } = useAuthState();
  const { language } = useGlobalContext();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Omit<Goal, "id" | "status">>();

  const t = {
    en: { title: "My Goals", add: "Add Goal", noGoals: "No goals yet. Set your first goal!", done: "Done", active: "Active", delete: "Delete", markDone: "Mark Done", loading: "Loading...", category: "Category", targetDate: "Target Date", description: "Description (optional)", titleLabel: "Goal Title" },
    es: { title: "Mis Metas", add: "Agregar Meta", noGoals: "Sin metas aún. ¡Establece tu primera meta!", done: "Completada", active: "Activa", delete: "Eliminar", markDone: "Marcar como hecha", loading: "Cargando...", category: "Categoría", targetDate: "Fecha Objetivo", description: "Descripción (opcional)", titleLabel: "Título de la Meta" },
  }[language];

  useEffect(() => {
    if (!user) return;
    getGoals(user.uid).then((data) => {
      setGoals(data as Goal[]);
      setLoading(false);
    });
  }, [user]);

  async function onSubmit(data: Omit<Goal, "id" | "status">) {
    if (!user) return;
    const doc = await addGoal(user.uid, data);
    setGoals((prev) => [{ id: doc.id, ...data, status: "active" }, ...prev]);
    reset();
    setOpen(false);
    toast.success(language === "es" ? "Meta agregada" : "Goal added");
  }

  async function handleMarkDone(id: string) {
    if (!user) return;
    await updateGoal(user.uid, id, { status: "done" });
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, status: "done" } : g));
  }

  async function handleDelete(id: string) {
    if (!user) return;
    await deleteGoal(user.uid, id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
    toast.success(language === "es" ? "Meta eliminada" : "Goal deleted");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" />{t.add}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.add}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-sm">{t.titleLabel}</Label>
                <Input {...register("title", { required: true })} placeholder="Learn Spanish, Run a 5K..." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm">{t.description}</Label>
                <Textarea {...register("description")} placeholder="More details..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm">{t.category}</Label>
                  <Input {...register("category")} placeholder="Health, Career..." />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">{t.targetDate}</Label>
                  <Input type="date" {...register("targetDate")} />
                </div>
              </div>
              <Button type="submit" className="w-full">{t.add}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />{t.loading}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Target className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>{t.noGoals}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <Card key={goal.id} className={`group ${goal.status === "done" ? "opacity-60" : ""}`}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`font-medium ${goal.status === "done" ? "line-through" : ""}`}>{goal.title}</p>
                    <Badge variant={goal.status === "done" ? "secondary" : "default"} className="text-xs">
                      {goal.status === "done" ? t.done : t.active}
                    </Badge>
                    {goal.category && <Badge variant="outline" className="text-xs">{goal.category}</Badge>}
                  </div>
                  {goal.description && <p className="text-xs text-muted-foreground">{goal.description}</p>}
                  {goal.targetDate && <p className="text-xs text-muted-foreground mt-0.5">📅 {goal.targetDate}</p>}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  {goal.status !== "done" && (
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-600" onClick={() => handleMarkDone(goal.id)}>
                      <Check className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(goal.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GoalsPage() {
  return <AuthGuard><GoalsContent /></AuthGuard>;
}
