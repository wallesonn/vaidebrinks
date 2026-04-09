"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Badge, Button, Card, CardDescription, CardHeader, CardTitle, EmptyState, FlowSteps, Rating, SectionHeader } from "@/components/ui";
import { AvailabilitySelector, Gallery } from "@/components/marketplace";
import { getFirstBookableSlot, getProviderById, getToyBySlug } from "@/lib/mock-data";
import { formatCurrency, formatLongDate } from "@/lib/utils";
import { useApp } from "@/components/app-provider";

export default function ToyDetailsPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { setSelection, draft } = useApp();
  const slug = params.slug;

  const toy = useMemo(() => getToyBySlug(slug), [slug]);
  const provider = toy ? getProviderById(toy.providerId) : undefined;
  const initial = toy ? getFirstBookableSlot(toy) : null;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");

  useEffect(() => {
    if (toy && initial) {
      const date = draft.toySlug === toy.slug && draft.date ? draft.date : initial.date;
      const schedule = toy.schedules.find((item) => item.date === date) ?? toy.schedules[0];
      const slotId =
        draft.toySlug === toy.slug && draft.slotId && schedule?.slots.some((slot) => slot.id === draft.slotId && slot.status !== "sold_out")
          ? draft.slotId
          : schedule?.slots.find((slot) => slot.status !== "sold_out")?.id ?? initial.slotId;

      setSelectedDate(date);
      setSelectedSlotId(slotId);
      setSelection({ toySlug: toy.slug, date, slotId });
    }
  }, [draft.date, draft.slotId, draft.toySlug, initial, setSelection, toy]);

  if (!toy || !provider) {
    return (
      <EmptyState
        title="Brinquedo não encontrado"
        description="O anúncio que você tentou abrir não existe no catálogo simulado. Volte à busca e escolha outra opção."
        action={<Button href="/search">Voltar à busca</Button>}
      />
    );
  }

  const currentSchedule = toy.schedules.find((item) => item.date === selectedDate) ?? toy.schedules[0];
  const selectedSlot = currentSchedule?.slots.find((slot) => slot.id === selectedSlotId);
  const canReserve = Boolean(selectedDate && selectedSlot && selectedSlot.status !== "sold_out");

  return (
    <div className="space-y-8 pb-10">
      <FlowSteps current={1} />

      <SectionHeader
        eyebrow="Detalhes do brinquedo"
        title={toy.name}
        description={toy.summary}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-50 text-indigo-700">{toy.category}</Badge>
            <Badge className="bg-emerald-50 text-emerald-700">{toy.ageRange}</Badge>
          </div>
        }
      />

      <Gallery toy={toy} />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Por que os pais adoram</CardTitle>
                <CardDescription>História visual, detalhes do fornecedor e sinais de confiança ajudam você a escolher mais rápido.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-4 text-sm leading-7 text-slate-600">
              <p>{toy.description}</p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {toy.highlights.map((highlight) => (
                  <li key={highlight} className="rounded-3xl bg-slate-50 p-4 font-semibold text-slate-800">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Informações do fornecedor</CardTitle>
                <CardDescription>Perfil verificado, tempo de resposta e especialidades.</CardDescription>
              </div>
            </CardHeader>
            <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-start">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-3xl text-white shadow-soft">
                ★
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-black text-slate-900">{provider.name}</h3>
                  <Badge className="bg-emerald-50 text-emerald-700">Verificado</Badge>
                </div>
                <p className="text-sm leading-7 text-slate-600">{provider.about}</p>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((item) => (
                    <Badge key={item} className="bg-slate-100 text-slate-700">
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
                  <Rating value={provider.rating} />
                  <span>{provider.responseTime}</span>
                  <span>{provider.city}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <div>
                <CardTitle>Avaliações</CardTitle>
                <CardDescription>Os pais compartilham feedback rápido após cada comemoração.</CardDescription>
              </div>
            </CardHeader>
            <div className="grid gap-4 md:grid-cols-2">
              {toy.reviews.map((review) => (
                <div key={review.id} className="rounded-[26px] bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">{review.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{formatLongDate(review.date)}</p>
                    </div>
                    <Badge className="bg-amber-50 text-amber-700">★ {review.rating}</Badge>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Locação diária</p>
                <p className="mt-2 text-3xl font-black text-slate-900">{formatCurrency(toy.pricePerDay)}</p>
                <p className="mt-2 text-sm text-slate-500">Inclui montagem e retirada pelo fornecedor.</p>
              </div>
              <Badge className="bg-indigo-50 text-indigo-700">{toy.reviewCount} avaliações</Badge>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p>Capacidade: <span className="font-semibold text-slate-900">{toy.capacity}</span></p>
              <p>Localização: <span className="font-semibold text-slate-900">{toy.location}</span></p>
            </div>
          </Card>

          <AvailabilitySelector
            toy={toy}
            selectedDate={selectedDate}
            selectedSlotId={selectedSlotId}
            onDateChange={(date) => {
              setSelectedDate(date);
              const schedule = toy.schedules.find((item) => item.date === date);
              const nextSlot = schedule?.slots.find((slot) => slot.status !== "sold_out");
              if (nextSlot) {
                setSelectedSlotId(nextSlot.id);
                setSelection({ toySlug: toy.slug, date, slotId: nextSlot.id });
              }
            }}
            onSlotChange={(slotId) => {
              setSelectedSlotId(slotId);
              setSelection({ toySlug: toy.slug, date: selectedDate, slotId });
            }}
          />

          <Card className="sticky top-24">
            <CardHeader>
              <div>
                <CardTitle>Pronto para reservar?</CardTitle>
                <CardDescription>Selecione um horário disponível e continue para o pagamento.</CardDescription>
              </div>
            </CardHeader>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Horário selecionado</p>
                <p className="mt-1 font-bold text-slate-900">{selectedSlot?.label ?? "Escolha um"}</p>
                <p className="mt-1 text-slate-600">{selectedSlot?.status === "limited" ? "Restam poucas vagas" : selectedSlot?.status === "available" ? "Disponível agora" : "Esgotado"}</p>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={!canReserve}
                onClick={() => {
                  setSelection({ toySlug: toy.slug, date: selectedDate, slotId: selectedSlotId });
                  router.push("/booking");
                }}
              >
                Reservar agora
              </Button>
              <Button href="/search" variant="secondary" className="w-full">
                Voltar à busca
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
