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
        title="No toy selected yet"
        description="Open a toy page and choose an available slot before moving to booking."
        action={<Button href="/search">Browse toys</Button>}
      />
    );
  }

  const handleContinue = () => {
    updateDraft(form);
    router.push("/payment");
  };

  const selectedSlotLabel = selectedSlot?.label ?? "Choose a slot";

  return (
    <div className="space-y-8 pb-10">
      <FlowSteps current={1} />
      <SectionHeader
        eyebrow="Booking"
        title="Enter your party details"
        description="This step feels like ordering a ticket for your party toy. We keep the selected toy and slot visible the entire time."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <BookingFormFields value={form} onChange={(patch) => setForm((current) => ({ ...current, ...patch }))} />
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleContinue} size="lg" className="min-w-[180px]">
              Continue to payment
            </Button>
            <Button href={`/toy/${toy.slug}`} variant="secondary" size="lg">
              Adjust slot
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <SummaryCard toy={toy} date={draft.date} slotLabel={selectedSlotLabel} />
          <div className="rounded-[28px] border border-indigo-100 bg-indigo-50 p-6 text-sm leading-6 text-indigo-900">
            <p className="font-black">Helpful reminder</p>
            <p className="mt-2 text-indigo-900/80">
              If a slot appears sold out, return to the listing page and pick another time. Only available slots can be reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
