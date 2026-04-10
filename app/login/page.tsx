"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, User as UserIcon, LogIn, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button, Card, Input, Label, Badge } from "@/components/ui";
import { mockUsers } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

const hints = {
  pai: mockUsers.filter((u) => u.role === "pai"),
  empresa: mockUsers.filter((u) => u.role === "empresa"),
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<UserRole>("pai");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error ?? "Erro ao entrar.");
      return;
    }
    router.push(role === "empresa" ? "/search" : "/eventos-escolares");
  };

  const fillHint = (hintEmail: string) => {
    setEmail(hintEmail);
    setPassword("senha123");
    setError("");
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center py-10">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-500">Vai de Brinks</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Entrar na plataforma</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Escolha seu tipo de conta e acesse com os dados de exemplo.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {(["pai", "empresa"] as UserRole[]).map((r) => {
            const Icon = r === "pai" ? UserIcon : Building2;
            const labels = { pai: "Sou pai / mãe", empresa: "Sou empresa" };
            return (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setError(""); }}
                className={`flex flex-col items-center gap-2 rounded-3xl border-2 p-5 text-sm font-semibold transition ${
                  role === r
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Icon className="h-6 w-6" />
                {labels[r]}
              </button>
            );
          })}
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Entrando..." : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Entrar
                </span>
              )}
            </Button>
          </form>
        </Card>

        <Card>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
            Contas de exemplo — {role === "pai" ? "pais" : "empresas"}
          </p>
          <div className="mt-3 space-y-2">
            {hints[role].map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => fillHint(u.email)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-left transition hover:bg-indigo-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-700">
                    {u.avatarInitials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-slate-200 text-slate-600">{u.city}</Badge>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">Qualquer senha é aceita neste protótipo.</p>
        </Card>

      </div>
    </div>
  );
}
