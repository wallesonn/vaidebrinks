"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyState, FlowSteps, SectionHeader, Button } from "@/components/ui";
import { BuyerPaymentForm, SummaryCard } from "@/components/marketplace";
import { getFirstBookableSlot, getToyBySlug } from "@/lib/mock-data";
import { useApp } from "@/components/app-provider";
import type { BookingDraft } from "@/lib/types";

export default function PaymentPage() {
  const router = useRouter();
  const { draft, updateDraft, setSelection, createBooking } = useApp();
  const [form, setForm] = useState<BookingDraft>(draft);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        title="No reservation ready"
        description="Select a toy and fill the booking step before simulating payment."
        action={<Button href="/search">Browse toys</Button>}
      />
    );
  }

  const handlePayment = () => {
    setError("");
    setLoading(true);

    window.setTimeout(() => {
      updateDraft(form);
      const booking = createBooking(form);
      setLoading(false);

      if (!booking) {
        setError("Payment could not be completed. Please check your selected slot and try again.");
        return;
      }

      router.push(`/confirmation/${booking.id}`);
    }, 900);
  };

  return (
    <div className="space-y-8 pb-10">
      <FlowSteps current={2} />
      <SectionHeader
        eyebrow="Checkout"
        title="Complete your simulated payment"
        description="This checkout mirrors a real product experience, but everything is powered by mocked local state."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <BuyerPaymentForm
            value={form}
            onChange={(patch) => setForm((current) => ({ ...current, ...patch }))}
            onSubmit={handlePayment}
            loading={loading}
          />
          {error ? <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</div> : null}
        </div>

        <div className="space-y-6">
          <SummaryCard toy={toy} date={draft.date} slotLabel={selectedSlot?.label ?? "Choose a slot"} />
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Payment hint</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use any fake card data. Submitting creates a new confirmed booking and takes you to the confirmation page.
            </p>
          </div>
          <Button href="/booking" variant="secondary" className="w-full">
            Back to booking
          </Button>
        </div>
      </div>
    </div>
  );
}
