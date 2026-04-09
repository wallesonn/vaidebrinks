"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState, FlowSteps, SectionHeader, Button } from "@/components/ui";
import { BookingFormFields, SummaryCard } from "@/components/marketplace";
import { getFirstBookableSlot, getToyBySlug } from "@/lib/mock-data";
import { useApp } from "@/components/app-provider";
import type { BookingDraft } from "@/lib/types";

export default function BookingPage() {
  const router = useRouter();
  const { draft, updateDraft, setSelection } = useApp();
  const [form, setForm] = useState<BookingDraft>(draft);

  const toy = useMemo(() => getToyBySlug(draft.toySlug), [draft.toySlug]);
  const currentSchedule = toy?.schedules.find((item) => item.date === draft.date) ?? toy?.schedules[0];
  const selectedSlot = currentSchedule?.slots.find((slot) => slot.id === draft.slotId);

  useEffect(() => {
    setForm(draft);
  }, [draft]);

  useEffect(() => {
    if (toy && (!draft.date || !draft.slotId)) {
      const initial = getFirstBookableSlot(toy);
      if (initial) {
        setSelection({ toySlug: toy.slug, date: initial.date, slotId: initial.slotId });
        setForm((current) => ({ ...current, toySlug: toy.slug, date: initial.date, slotId: initial.slotId }));
      }
    }
  }, [draft.date, draft.slotId, setSelection, toy]);

  if (!toy) {
    return (
      <EmptyState
        title="Nenhum brinquedo selecionado ainda"
        description="Abra a página de um brinquedo e escolha um horário disponível antes de continuar para a reserva."
        action={<Button href="/search">Explorar brinquedos</Button>}
      />
    );
  }

  const handleContinue = () => {
    updateDraft(form);
    router.push("/payment");
  };

  const selectedSlotLabel = selectedSlot?.label ?? "Escolha um horário";

  return (
    <div className="space-y-8 pb-10">
      <FlowSteps current={1} />
      <SectionHeader
        eyebrow="Reserva"
        title="Informe os detalhes da festa"
        description="Esta etapa parece comprar um ingresso para o brinquedo da sua festa. Mantemos o brinquedo e o horário selecionados visíveis o tempo todo."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <BookingFormFields value={form} onChange={(patch) => setForm((current) => ({ ...current, ...patch }))} />
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleContinue} size="lg" className="min-w-[180px]">
              Continuar para o pagamento
            </Button>
            <Button href={`/toy/${toy.slug}`} variant="secondary" size="lg">
              Ajustar horário
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <SummaryCard toy={toy} date={draft.date} slotLabel={selectedSlotLabel} />
          <div className="rounded-[28px] border border-indigo-100 bg-indigo-50 p-6 text-sm leading-6 text-indigo-900">
            <p className="font-black">Lembrete útil</p>
            <p className="mt-2 text-indigo-900/80">
              Se um horário aparecer como esgotado, volte à página da listagem e escolha outro. Apenas horários disponíveis podem ser reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
