"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Filter, Search, SlidersHorizontal } from "lucide-react";
import { priceRanges, toys, toyTypes } from "@/lib/mock-data";
import { getToyAvailabilityLabel } from "@/lib/mock-data";
import { Badge, Button, Card, Input, Label, SectionHeader, Select } from "@/components/ui";
import { ToyCard } from "@/components/marketplace";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedType, setSelectedType] = useState("Todos os tipos");
  const [selectedPrice, setSelectedPrice] = useState("0");

  const dateOptions = useMemo(() => {
    const dates = new Set<string>();
    toys.forEach((toy) => toy.schedules.forEach((schedule) => dates.add(schedule.date)));
    return Array.from(dates).sort();
  }, []);

  const filteredToys = useMemo(() => {
    const priceRange = priceRanges.find((range) => String(range.min) === selectedPrice) ?? priceRanges[0];

    return toys.filter((toy) => {
      const matchesQuery =
        !query ||
        toy.name.toLowerCase().includes(query.toLowerCase()) ||
        toy.summary.toLowerCase().includes(query.toLowerCase()) ||
        toy.category.toLowerCase().includes(query.toLowerCase());
      const matchesType = selectedType === "Todos os tipos" || toy.category === selectedType;
      const matchesPrice = toy.pricePerDay >= priceRange.min && toy.pricePerDay <= priceRange.max;
      const matchesDate = !selectedDate || toy.schedules.some((schedule) => schedule.date === selectedDate);

      return matchesQuery && matchesType && matchesPrice && matchesDate;
    });
  }, [query, selectedDate, selectedType, selectedPrice]);

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader
        eyebrow="Explorar brinquedos"
        title="Busque as melhores opções para a sua próxima comemoração"
        description="Use os filtros para refinar por data, categoria e preço. Os resultados atualizam em tempo real para facilitar a comparação."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-50 text-indigo-700">{filteredToys.length} resultados</Badge>
            <Button href="/bookings" variant="secondary">
              Minhas reservas
            </Button>
          </div>
        }
      />

      <Card>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Label htmlFor="query">Buscar brinquedos</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="query"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque castelos infláveis, piscinas de bolinhas, escorregadores..."
                className="pl-11"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="date">Data</Label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Select id="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} className="pl-11">
                <option value="">Qualquer data</option>
                {dateOptions.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select id="type" value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
              {toyTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="price">Faixa de preço</Label>
            <Select id="price" value={selectedPrice} onChange={(event) => setSelectedPrice(event.target.value)}>
              {priceRanges.map((range) => (
                <option key={range.label} value={String(range.min)}>
                  {range.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
          <span>Todos os filtros são locais e atualizam o catálogo simulado imediatamente.</span>
          {selectedDate ? <Badge className="bg-slate-100 text-slate-600">Data: {selectedDate}</Badge> : null}
        </div>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
          {filteredToys.length ? (
            filteredToys.map((toy) => (
              <ToyCard key={toy.id} toy={toy} availabilityLabel={getToyAvailabilityLabel(toy, selectedDate || undefined)} />
            ))
          ) : (
            <Card className="md:col-span-2">
              <div className="flex flex-col items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">✧</div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Nenhum resultado corresponde aos filtros</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Tente ampliar a faixa de preço ou remover o filtro de data para ver mais brinquedos disponíveis.
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setQuery("");
                    setSelectedDate("");
                    setSelectedType("Todos os tipos");
                    setSelectedPrice("0");
                  }}
                >
                  Limpar filtros
                </Button>
              </div>
            </Card>
          )}
        </div>

        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Filter className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Filtros inteligentes</p>
                <p className="text-sm text-slate-600">Pesquise pelo estilo do brinquedo, data do evento e orçamento.</p>
              </div>
            </div>
          </Card>

          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Dica de disponibilidade</p>
            <h3 className="mt-2 text-xl font-black text-slate-900">Horários esgotados continuam visíveis</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              O card da listagem reflete o status de disponibilidade para que os pais vejam rapidamente o que pode ser reservado agora.
            </p>
          </Card>

          <Card>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Ações rápidas</p>
            <div className="mt-4 space-y-3">
              <Button href="/" variant="secondary" className="w-full">
                Voltar ao início
              </Button>
              <Button href="/bookings" className="w-full">
                Ver minhas reservas
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
