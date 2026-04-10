export type SlotStatus = "available" | "limited" | "sold_out";

export type TimeSlot = {
  id: string;
  label: string;
  status: SlotStatus;
};

export type ToySchedule = {
  date: string;
  label: string;
  slots: TimeSlot[];
};

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

export type Provider = {
  id: string;
  name: string;
  city: string;
  verified: boolean;
  rating: number;
  responseTime: string;
  specialties: string[];
  about: string;
  accent: string;
};

export type Toy = {
  id: string;
  slug: string;
  name: string;
  category: string;
  providerId: string;
  summary: string;
  description: string;
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  ageRange: string;
  capacity: string;
  location: string;
  featured: boolean;
  popular: boolean;
  highlights: string[];
  schedules: ToySchedule[];
  reviews: Review[];
  accent: string;
};

export type BookingStatus = "confirmed" | "pending" | "canceled";

export type Booking = {
  id: string;
  toyId: string;
  toySlug: string;
  toyName: string;
  providerName: string;
  category: string;
  price: number;
  date: string;
  dateLabel: string;
  slotId: string;
  slotLabel: string;
  childName: string;
  childAge: string;
  address: string;
  eventType: string;
  childrenCount: string;
  notes: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  cardLast4: string;
  status: BookingStatus;
  createdAt: string;
};

export type BookingDraft = {
  toySlug: string;
  date: string;
  slotId: string;
  childName: string;
  childAge: string;
  address: string;
  eventType: string;
  childrenCount: string;
  notes: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

export type AppState = {
  draft: BookingDraft;
  bookings: Booking[];
};

export type UserRole = "pai" | "empresa";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
  avatarInitials: string;
};

export type SchoolEventStatus = "aberto" | "encerrado" | "em_breve";

export type SchoolEvent = {
  id: string;
  title: string;
  school: string;
  city: string;
  date: string;
  time: string;
  description: string;
  category: string;
  ageRange: string;
  capacity: number;
  enrolled: number;
  status: SchoolEventStatus;
  organizer: string;
  address: string;
  free: boolean;
  price?: number;
};
