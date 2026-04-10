"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { CalendarHeart, House, PartyPopper, Ticket, School, LogOut, LogIn } from "lucide-react";
import { useApp } from "@/components/app-provider";
import { useAuth } from "@/components/auth-provider";
import { Button, cn } from "@/components/ui";

const navItems = [
  { href: "/", label: "Início", icon: House },
  { href: "/search", label: "Explorar", icon: PartyPopper },
  { href: "/eventos-escolares", label: "Eventos escolares", icon: School },
  { href: "/bookings", label: "Minhas reservas", icon: Ticket },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { bookings } = useApp();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f7f7ff_35%,#ffffff_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-soft">
              <CalendarHeart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Vai de Brinks</p>
              <p className="text-xs font-semibold text-slate-500">Brinquedos de festa, reservados como eventos</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition",
                    active ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden items-center gap-2 sm:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-700">
                    {user.avatarInitials}
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user.city}</p>
                  </div>
                </div>
                <div className="hidden rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 sm:block">
                  {bookings.length} reservas
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Sair</span>
                </button>
              </>
            ) : (
              <>
                <div className="hidden rounded-2xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 sm:block">
                  {bookings.length} reservas
                </div>
                <Button href="/login" variant="primary" size="sm" className="hidden sm:inline-flex">
                  <LogIn className="mr-1.5 h-4 w-4" />
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>

      <footer className="border-t border-white/70 bg-white/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Feito para pais, fornecedores e festas inesquecíveis.</p>
          <div className="flex items-center gap-3">
            <Link href="/search" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Explorar brinquedos
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/eventos-escolares" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Eventos escolares
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/bookings" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Ver reservas
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
