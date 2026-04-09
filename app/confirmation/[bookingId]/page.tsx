"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { CheckCircle2, Sparkles } from "lucide-react";
import { useApp } from "@/components/app-provider";
import { Button, Badge, Card, SectionHeader, EmptyState } from "@/components/ui";
import { formatCurrency, formatLongDate } from "@/lib/utils";

export default function ConfirmationPage() {
  const params = useParams<{ bookingId: string }>();
  const { findBooking } = useApp();
  const bookingId = params.bookingId;

  const booking = useMemo(() => findBooking(bookingId), [bookingId, findBooking]);

  if (!booking) {
    return (
      <EmptyState
        title="Booking not found"
        description="The confirmation page could not load a matching reservation from local state."
        action={<Button href="/bookings">View my bookings</Button>}
      />
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader eyebrow="Success" title="Your reservation is confirmed" description="The mock checkout created a new ticket-like booking with a unique ID." />

      <Card className="border-emerald-100 bg-emerald-50/60">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Booking ID</p>
                <p className="mt-1 text-2xl font-black text-slate-900">{booking.id}</p>
              </div>
            </div>
            <h3 className="mt-6 text-3xl font-black tracking-tight text-slate-900">{booking.toyName}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Your party toy is reserved for <span className="font-bold">{formatLongDate(booking.date)}</span> during <span className="font-bold">{booking.slotLabel}</span>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-emerald-500 text-white">Confirmed</Badge>
            <Sparkles className="h-8 w-8 text-amber-500" />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="Provider" value={booking.providerName} />
            <Info label="Time slot" value={booking.slotLabel} />
            <Info label="Child" value={`${booking.childName} (${booking.childAge})`} />
            <Info label="Price" value={formatCurrency(booking.price)} />
            <Info label="Event type" value={booking.eventType} />
            <Info label="Address" value={booking.address} />
          </div>
        </Card>

        <Card>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Next steps</p>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>1. Check your booking in the My Bookings area.</li>
            <li>2. Keep your mock booking ID saved for reference.</li>
            <li>3. Explore more toys for future parties.</li>
          </ol>
          <div className="mt-6 flex flex-col gap-3">
            <Button href="/bookings">Go to my bookings</Button>
            <Button href="/" variant="secondary">Return home</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
}
