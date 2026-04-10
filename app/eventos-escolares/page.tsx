"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, Users, Clock, BookOpen, Search } from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import { Button, Card, Badge, Input, Label, SectionHeader, EmptyState } from "@/components/ui";
import { eventCities, eventCategories, mockSchoolEvents } from "@/lib/mock-data";
import type { SchoolEvent, SchoolEventStatus } from "@/lib/types";
import { formatLongDate } from "@/lib/utils";

const statusConfig: Record<SchoolEventStatus, { label: string; className: string }> = {
  aberto:    { label: "Inscrições abertas", className: "bg-emerald-50 text-emerald-700" },
  em_breve:  { label: "Em breve",           className: "bg-amber-50 text-amber-700" },
  encerrado: { label: "Encerrado",          className: "bg-slate-100 text-slate-500" },
};

function EventCard({ event }: { event: SchoolEvent }) {
  const st = statusConfig[event.status];
  const spotsLeft = event.capacity - event.enrolled;
  const pct = Math.round((event.enrolled / event.capacity) * 100);

  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={st.className}>{st.label}</Badge>
            <Badge className="bg-indigo-50 text-indigo-700">{event.category}</Badge>
            {event.free ? (
              <Badge className="bg-emerald-50 text-emerald-700">Gratuito</Badge>
            ) : (
              <Badge className="bg-violet-50 text-violet-700">
                R$ {event.price?.toFixed(2).replace(".", ",")}
              </Badge>
            )}
          </div>

          <h3 className="text-xl font-black tracking-tight text-slate-900">{event.title}</h3>
          <p className="text-sm font-semibold text-indigo-600">{event.school}</p>
          <p className="text-sm leading-6 text-slate-600">{event.description}</p>

          <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatLongDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {event.city}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {event.ageRange}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              {event.enrolled}/{event.capacity} inscritos
            </span>
          </div>

          <div className="pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Vagas preenchidas</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-2 rounded-full transition-all ${pct >= 100 ? "bg-rose-400" : pct >= 70 ? "bg-amber-400" : "bg-emerald-400"}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Button
            href={`/eventos-escolares/${event.id}`}
            size="sm"
            disabled={event.status === "encerrado"}
            variant={event.status === "encerrado" ? "secondary" : "primary"}
          >
            {event.status === "encerrado" ? "Encerrado" : event.status === "em_breve" ? "Saiba mais" : "Ver detalhes"}
          </Button>
          {event.status === "aberto" && spotsLeft <= 10 && (
            <p className="text-xs font-semibold text-rose-600">{spotsLeft} {spotsLeft === 1 ? "vaga restante" : "vagas restantes"}</p>
          )}
        </div>
      </div>

      <p className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
        <MapPin className="mr-1 inline h-3 w-3" />{event.address}
        &nbsp;&nbsp;•&nbsp;&nbsp;
        Organizado por <span className="font-semibold text-slate-600">{event.organizer}</span>
      </p>
    </Card>
  );
}

export default function EventosEscolaresPage() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [city, setCity] = useState(user?.city && eventCities.includes(user.city) ? user.city : "Todas as cidades");
  const [category, setCategory] = useState("Todas as categorias");
  const [statusFilter, setStatusFilter] = useState<SchoolEventStatus | "todos">("todos");

  const filtered = useMemo(() => {
    return mockSchoolEvents.filter((e) => {
      const matchCity = city === "Todas as cidades" || e.city === city;
      const matchCat = category === "Todas as categorias" || e.category === category;
      const matchStatus = statusFilter === "todos" || e.status === statusFilter;
      const matchQuery = !query || e.title.toLowerCase().includes(query.toLowerCase()) || e.school.toLowerCase().includes(query.toLowerCase());
      return matchCity && matchCat && matchStatus && matchQuery;
    });
  }, [query, city, category, statusFilter]);

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader
        eyebrow="Eventos escolares"
        title="Festas e eventos nas escolas"
        description="Encontre eventos na cidade que você mora e confira brinquedos disponíveis para cada ocasião."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {user && (
              <Badge className="bg-indigo-50 text-indigo-700">
                {user.city}
              </Badge>
            )}
            <Button href="/search" variant="secondary">Ver brinquedos</Button>
          </div>
        }
      />

      <Card>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <Label htmlFor="query">Buscar eventos</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Nome do evento ou escola..."
                className="pl-11"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="city">Cidade</Label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              {eventCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-12 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              {eventCategories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(["todos", "aberto", "em_breve", "encerrado"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                statusFilter === s ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s === "todos" ? "Todos" : s === "aberto" ? "Abertos" : s === "em_breve" ? "Em breve" : "Encerrados"}
            </button>
          ))}
          <span className="ml-auto self-center text-sm text-slate-400">{filtered.length} evento{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      </Card>

      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum evento encontrado"
          description="Tente ajustar os filtros ou buscar por outra cidade ou categoria."
          action={<Button onClick={() => { setQuery(""); setCity("Todas as cidades"); setCategory("Todas as categorias"); setStatusFilter("todos"); }}>Limpar filtros</Button>}
        />
      )}
    </div>
  );
}
