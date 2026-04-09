"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Ticket } from "lucide-react";
import { useApp } from "@/components/app-provider";
import { Badge, Button, Card, EmptyState, SectionHeader } from "@/components/ui";
import { BookingRow } from "@/components/marketplace";
import type { BookingStatus } from "@/lib/types";

export default function MyBookingsPage() {
  const { bookings, cancelBooking } = useApp();
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  const filteredBookings = useMemo(() => {
    return filter === "all" ? bookings : bookings.filter((booking) => booking.status === filter);
  }, [bookings, filter]);

  return (
    <div className="space-y-8 pb-10">
      <SectionHeader
        eyebrow="Reservations"
        title="My bookings"
        description="Track confirmed, pending, and canceled reservations in one place, just like a ticket dashboard."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-50 text-indigo-700">{bookings.length} total</Badge>
            <Button href="/search" variant="secondary">
              Browse more
            </Button>
          </div>
        }
      />

      <Card>
        <div className="flex flex-wrap items-center gap-2">
          {(["all", "confirmed", "pending", "canceled"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === status ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {status === "all" ? "All bookings" : status}
            </button>
          ))}
        </div>
      </Card>

      {filteredBookings.length ? (
        <div className="space-y-5">
          {filteredBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} onCancel={cancelBooking} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No bookings in this filter"
          description="Try a different status tab or create a new reservation from the catalog."
          action={<Button href="/search">Find a toy</Button>}
        />
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <CalendarClock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Ticket-like reservations</p>
              <p className="text-sm text-slate-600">Each booking keeps toy, slot, and party details together.</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Mock status controls</p>
              <p className="text-sm text-slate-600">You can cancel a confirmed booking to see status updates live.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
