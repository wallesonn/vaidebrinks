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
        eyebrow="Reservas"
        title="Minhas reservas"
        description="Acompanhe reservas confirmadas, pendentes e canceladas em um só lugar, como um painel de ingressos."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-indigo-50 text-indigo-700">{bookings.length} no total</Badge>
            <Button href="/search" variant="secondary">
              Explorar mais
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
              {status === "all" ? "Todas" : status === "confirmed" ? "Confirmadas" : status === "pending" ? "Pendentes" : "Canceladas"}
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
          title="Nenhuma reserva neste filtro"
          description="Tente outra aba de status ou crie uma nova reserva no catálogo."
          action={<Button href="/search">Encontrar brinquedo</Button>}
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
              <p className="text-sm text-slate-600">Cada reserva mantém brinquedo, horário e detalhes da festa juntos.</p>
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
              <p className="text-sm text-slate-600">Você pode cancelar uma reserva confirmada para ver a atualização de status em tempo real.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
