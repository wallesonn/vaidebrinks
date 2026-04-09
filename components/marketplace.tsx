"use client";

import Link from "next/link";
import type { ChangeEvent } from "react";
import { CalendarClock, CheckCircle2, Clock3, MapPin, Star, Ticket, Users } from "lucide-react";
import type { Booking, BookingStatus, Provider, TimeSlot, Toy } from "@/lib/types";
import { getProviderById } from "@/lib/mock-data";
import { ArtworkFrame, Badge, Button, Card, CardDescription, CardHeader, CardTitle, Input, Label, Rating, Select, Textarea, cn } from "@/components/ui";
import { formatCurrency, formatLongDate } from "@/lib/utils";

export function ToyCard({
  toy,
  availabilityLabel,
}: {
  toy: Toy;
  availabilityLabel?: string;
}) {
  return (
    <Card className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <div className={`h-52 bg-gradient-to-br ${toy.accent} p-5 text-white`}>
        <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <Badge className="bg-white/20 text-white">{toy.category}</Badge>
            <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{toy.ageRange}</div>
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tight">{toy.name}</h3>
            <p className="mt-2 max-w-md text-sm text-white/85">{toy.summary}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <Rating value={toy.rating} reviews={toy.reviewCount} />
          <div className="flex flex-col items-end gap-2 text-right">
            <div className="text-right">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">From</p>
              <p className="text-xl font-black text-slate-900">{formatCurrency(toy.pricePerDay)}</p>
            </div>
            {availabilityLabel ? <Badge className="bg-indigo-50 text-indigo-700">{availabilityLabel}</Badge> : null}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="h-4 w-4 text-indigo-500" />
          <span>{toy.location}</span>
        </div>
        <Button href={`/toy/${toy.slug}`} variant="primary" className="w-full">
          Open details
        </Button>
      </div>
    </Card>
  );
}

export function ProviderStrip({ provider }: { provider: Provider }) {
  return (
    <Card className="overflow-hidden p-0">
      <div className={`h-24 bg-gradient-to-r ${provider.accent}`} />
      <div className="space-y-3 p-6">
        <CardHeader>
          <div>
            <CardTitle>{provider.name}</CardTitle>
            <CardDescription>{provider.city}</CardDescription>
          </div>
          <Badge className="bg-emerald-50 text-emerald-700">{provider.verified ? "Verified" : "Partner"}</Badge>
        </CardHeader>
        <Rating value={provider.rating} />
        <p className="text-sm leading-6 text-slate-600">{provider.about}</p>
      </div>
    </Card>
  );
}

export function Gallery({ toy }: { toy: Toy }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        <ArtworkFrame title={toy.name} subtitle={toy.category} accent={`bg-gradient-to-br ${toy.accent}`} />
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Setup", value: "45 min", icon: CalendarClock },
            { title: "Capacity", value: toy.capacity, icon: Users },
            { title: "Pick-up", value: "After party", icon: Ticket },
          ].map(({ title, value, icon: Icon }) => (
            <Card key={title} className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{title}</p>
                  <p className="mt-1 font-bold text-slate-900">{value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {["Hero angle", "Detail shot", "Party-ready view"].map((label, index) => (
          <div
            key={label}
            className={cn(
              "rounded-[28px] p-6 text-white shadow-soft",
              index === 0
                ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500"
                : index === 1
                  ? "bg-gradient-to-br from-amber-300 via-orange-300 to-rose-400"
                  : "bg-gradient-to-br from-sky-400 via-cyan-400 to-indigo-500"
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">{label}</p>
            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-2xl font-black">{index === 1 ? "Pastel details" : index === 2 ? "Ready to reserve" : "Bright & safe"}</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                  Designed to look like an event showcase while keeping the decision flow simple.
                </p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-white/90" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AvailabilitySelector({
  toy,
  selectedDate,
  selectedSlotId,
  onDateChange,
  onSlotChange,
}: {
  toy: Toy;
  selectedDate: string;
  selectedSlotId: string;
  onDateChange: (date: string) => void;
  onSlotChange: (slotId: string) => void;
}) {
  const schedule = toy.schedules.find((item) => item.date === selectedDate) ?? toy.schedules[0];

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Select your date and time slot</CardTitle>
          <CardDescription>Choose only an available slot. Limited slots are still bookable, sold out slots are disabled.</CardDescription>
        </div>
        <Badge className="bg-indigo-50 text-indigo-700">Event tickets</Badge>
      </CardHeader>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {toy.schedules.map((item) => {
          const active = item.date === schedule.date;
          return (
            <button
              key={item.date}
              type="button"
              onClick={() => {
                onDateChange(item.date);
                const firstAvailable = item.slots.find((slot) => slot.status !== "sold_out");
                if (firstAvailable) {
                  onSlotChange(firstAvailable.id);
                }
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {schedule.slots.map((slot) => {
          const active = selectedSlotId === slot.id;
          const disabled = slot.status === "sold_out";
          return (
            <button
              key={slot.id}
              type="button"
              disabled={disabled}
              onClick={() => onSlotChange(slot.id)}
              className={cn(
                "rounded-[22px] border p-4 text-left transition",
                active ? "border-indigo-500 bg-indigo-50" : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50",
                disabled && "cursor-not-allowed border-slate-100 bg-slate-50 opacity-50"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">{slot.label}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    <span>{slot.status === "limited" ? "Few spots left" : slot.status === "available" ? "Available now" : "Sold out"}</span>
                  </div>
                </div>
                <Badge
                  className={cn(
                    slot.status === "available"
                      ? "bg-emerald-50 text-emerald-700"
                      : slot.status === "limited"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-400"
                  )}
                >
                  {slot.status.replace("_", " ")}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export function SummaryCard({ toy, date, slotLabel }: { toy: Toy; date: string; slotLabel: string }) {
  const provider = getProviderById(toy.providerId);

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div>
          <CardTitle>Reservation summary</CardTitle>
          <CardDescription>This behaves like a ticket order before checkout.</CardDescription>
        </div>
        <Badge className="bg-fuchsia-50 text-fuchsia-700">{formatCurrency(toy.pricePerDay)}</Badge>
      </CardHeader>

      <div className="space-y-4 text-sm">
        <div className="rounded-3xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Selected toy</p>
          <p className="mt-1 text-base font-bold text-slate-900">{toy.name}</p>
          <p className="mt-1 text-slate-600">{toy.category}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Date</p>
            <p className="mt-1 font-bold text-slate-900">{date ? formatLongDate(date) : "Pick a date"}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Time slot</p>
            <p className="mt-1 font-bold text-slate-900">{slotLabel || "Choose a slot"}</p>
          </div>
        </div>
        <div className="rounded-3xl bg-indigo-50 p-4 text-indigo-900">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-indigo-500">Provider</p>
          <p className="mt-1 font-bold">{provider?.name}</p>
          <p className="mt-1 text-sm text-indigo-800/80">{provider?.city}</p>
        </div>
      </div>
    </Card>
  );
}

export function BookingFormFields({
  value,
  onChange,
}: {
  value: Record<string, string>;
  onChange: (patch: Record<string, string>) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Party details</CardTitle>
          <CardDescription>Tell the provider what to prepare for your celebration.</CardDescription>
        </div>
      </CardHeader>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="childName">Child name</Label>
          <Input id="childName" value={value.childName ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ childName: e.target.value })} placeholder="e.g. Luna" />
        </div>
        <div>
          <Label htmlFor="childAge">Child age</Label>
          <Input id="childAge" value={value.childAge ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ childAge: e.target.value })} placeholder="e.g. 6" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Event address</Label>
          <Input id="address" value={value.address ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ address: e.target.value })} placeholder="Street, neighborhood, city" />
        </div>
        <div>
          <Label htmlFor="eventType">Event type</Label>
          <Select id="eventType" value={value.eventType ?? "Birthday"} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ eventType: e.target.value })}>
            <option>Birthday</option>
            <option>School</option>
            <option>Community</option>
            <option>Family</option>
            <option>Other</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="childrenCount">Children attending</Label>
          <Input id="childrenCount" value={value.childrenCount ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ childrenCount: e.target.value })} placeholder="e.g. 14" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Additional notes</Label>
          <Textarea id="notes" value={value.notes ?? ""} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange({ notes: e.target.value })} placeholder="Theme, access instructions, special requests..." />
        </div>
      </div>
    </Card>
  );
}

export function BuyerPaymentForm({
  value,
  onChange,
  onSubmit,
  loading,
}: {
  value: Record<string, string>;
  onChange: (patch: Record<string, string>) => void;
  onSubmit: () => void;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Payment simulation</CardTitle>
          <CardDescription>Fake checkout inputs with a realistic flow and a success action.</CardDescription>
        </div>
      </CardHeader>

      <form
        className="grid gap-5 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <Label htmlFor="buyerName">Buyer name</Label>
          <Input id="buyerName" value={value.buyerName ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ buyerName: e.target.value })} placeholder="Your full name" />
        </div>
        <div>
          <Label htmlFor="buyerEmail">Email</Label>
          <Input id="buyerEmail" value={value.buyerEmail ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ buyerEmail: e.target.value })} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="buyerPhone">Phone</Label>
          <Input id="buyerPhone" value={value.buyerPhone ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ buyerPhone: e.target.value })} placeholder="(555) 555-5555" />
        </div>
        <div>
          <Label htmlFor="cardName">Card holder</Label>
          <Input id="cardName" value={value.cardName ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ cardName: e.target.value })} placeholder="Name on card" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="cardNumber">Card number</Label>
          <Input id="cardNumber" value={value.cardNumber ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ cardNumber: e.target.value })} placeholder="4242 4242 4242 4242" />
        </div>
        <div>
          <Label htmlFor="cardExpiry">Expiry</Label>
          <Input id="cardExpiry" value={value.cardExpiry ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ cardExpiry: e.target.value })} placeholder="04/29" />
        </div>
        <div>
          <Label htmlFor="cardCvv">CVV</Label>
          <Input id="cardCvv" value={value.cardCvv ?? ""} onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ cardCvv: e.target.value })} placeholder="123" />
        </div>
        <div className="sm:col-span-2 flex justify-end">
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
            {loading ? "Processing..." : "Confirm payment"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export function BookingRow({ booking, onCancel }: { booking: Booking; onCancel?: (id: string) => void }) {
  const statusStyles: Record<BookingStatus, string> = {
    confirmed: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    canceled: "bg-rose-50 text-rose-700",
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-indigo-500" />
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Booking {booking.id}</p>
              </div>
              <h3 className="mt-2 text-xl font-black text-slate-900">{booking.toyName}</h3>
              <p className="mt-1 text-sm text-slate-600">{booking.providerName} · {booking.category}</p>
            </div>
            <Badge className={statusStyles[booking.status]}>{booking.status}</Badge>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Info label="Date" value={booking.dateLabel} />
            <Info label="Slot" value={booking.slotLabel} />
            <Info label="Child" value={`${booking.childName} · ${booking.childAge} years`} />
            <Info label="Price" value={formatCurrency(booking.price)} />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-slate-100 bg-slate-50 p-6 lg:border-l lg:border-t-0 lg:min-w-[240px]">
          <div className="space-y-2 text-sm text-slate-600">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-indigo-500" />{booking.address}</p>
            <p className="flex items-center gap-2"><Users className="h-4 w-4 text-indigo-500" />{booking.childrenCount} children</p>
          </div>
          <div className="space-y-2">
            <Button href={`/toy/${booking.toySlug}`} variant="secondary" className="w-full">Open toy</Button>
            {onCancel && booking.status !== "canceled" ? (
              <Button type="button" variant="ghost" className="w-full" onClick={() => onCancel(booking.id)}>
                Cancel booking
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
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
