"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedBookings } from "@/lib/mock-data";
import type { AppState, Booking, BookingDraft } from "@/lib/types";
import { getProviderById, getToyBySlug } from "@/lib/mock-data";
import { makeBookingId } from "@/lib/utils";

const STORAGE_KEY = "vaidebrinks-state";

const defaultDraft: BookingDraft = {
  toySlug: "",
  date: "",
  slotId: "",
  childName: "",
  childAge: "",
  address: "",
  eventType: "Aniversário",
  childrenCount: "",
  notes: "",
  buyerName: "",
  buyerEmail: "",
  buyerPhone: "",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
};

type AppContextValue = AppState & {
  setSelection: (selection: Partial<Pick<BookingDraft, "toySlug" | "date" | "slotId">>) => void;
  updateDraft: (patch: Partial<BookingDraft>) => void;
  createBooking: (override?: Partial<BookingDraft>) => Booking | null;
  cancelBooking: (id: string) => void;
  clearDraft: () => void;
  findBooking: (id: string) => Booking | undefined;
};

const AppContext = createContext<AppContextValue | null>(null);

function readStoredState(): AppState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as AppState;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({ draft: defaultDraft, bookings: seedBookings });

  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setState({
        draft: { ...defaultDraft, ...stored.draft },
        bookings: stored.bookings.length ? stored.bookings : seedBookings,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppContextValue>(() => {
    return {
      ...state,
      setSelection: (selection) => {
        setState((current) => ({
          ...current,
          draft: {
            ...current.draft,
            ...selection,
          },
        }));
      },
      updateDraft: (patch) => {
        setState((current) => ({
          ...current,
          draft: {
            ...current.draft,
            ...patch,
          },
        }));
      },
      createBooking: (override) => {
        const draft = { ...state.draft, ...override };
        const toy = getToyBySlug(draft.toySlug);
        const provider = toy ? getProviderById(toy.providerId) : undefined;

        if (!toy || !provider || !draft.date || !draft.slotId) {
          return null;
        }

        const schedule = toy.schedules.find((item) => item.date === draft.date);
        const slot = schedule?.slots.find((item) => item.id === draft.slotId);

        if (!schedule || !slot || slot.status === "sold_out") {
          return null;
        }

        const booking: Booking = {
          id: makeBookingId(),
          toyId: toy.id,
          toySlug: toy.slug,
          toyName: toy.name,
          providerName: provider.name,
          category: toy.category,
          price: toy.pricePerDay,
          date: schedule.date,
          dateLabel: schedule.label,
          slotId: slot.id,
          slotLabel: slot.label,
          childName: draft.childName,
          childAge: draft.childAge,
          address: draft.address,
          eventType: draft.eventType,
          childrenCount: draft.childrenCount,
          notes: draft.notes,
          buyerName: draft.buyerName,
          buyerEmail: draft.buyerEmail,
          buyerPhone: draft.buyerPhone,
          cardLast4: draft.cardNumber.slice(-4).padStart(4, "0"),
          status: "confirmed",
          createdAt: new Date().toISOString(),
        };

        setState((current) => ({
          draft: defaultDraft,
          bookings: [booking, ...current.bookings],
        }));

        return booking;
      },
      cancelBooking: (id) => {
        setState((current) => ({
          ...current,
          bookings: current.bookings.map((booking) =>
            booking.id === id ? { ...booking, status: "canceled" } : booking
          ),
        }));
      },
      clearDraft: () => {
        setState((current) => ({
          ...current,
          draft: defaultDraft,
        }));
      },
      findBooking: (id) => state.bookings.find((booking) => booking.id === id),
    };
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
