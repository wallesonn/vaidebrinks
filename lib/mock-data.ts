import type { Booking, Provider, Toy } from "@/lib/types";
import { formatDateLabel, makeBookingId } from "@/lib/utils";

const buildSlots = (statuses: ("available" | "limited" | "sold_out")[]) =>
  statuses.map((status, index) => {
    const times = [
      "9:00 AM - 12:00 PM",
      "1:00 PM - 4:00 PM",
      "5:00 PM - 8:00 PM",
    ];

    return {
      id: `slot-${index + 1}`,
      label: times[index],
      status,
    };
  });

const buildSchedules = (dates: string[], slotMatrix: ("available" | "limited" | "sold_out")[][]) =>
  dates.map((date, index) => ({
    date,
    label: formatDateLabel(date),
    slots: buildSlots(slotMatrix[index]),
  }));

export const providers: Provider[] = [
  {
    id: "sunshine-play",
    name: "Sunshine Play Co.",
    city: "Austin, TX",
    verified: true,
    rating: 4.9,
    responseTime: "Usually replies in 10 minutes",
    specialties: ["Bounce houses", "Soft play", "Event setup"],
    about: "A family-run team that brings colorful, safety-first play experiences to backyards and community spaces.",
    accent: "from-sky-400 via-indigo-400 to-violet-500",
  },
  {
    id: "bubble-bounce",
    name: "Bubble Bounce Studio",
    city: "Orlando, FL",
    verified: true,
    rating: 4.8,
    responseTime: "Usually replies in 15 minutes",
    specialties: ["Ball pits", "Slides", "Party styling"],
    about: "Known for playful themes and premium inflatable equipment that looks as good as it performs.",
    accent: "from-fuchsia-400 via-pink-400 to-rose-500",
  },
  {
    id: "tiny-adventures",
    name: "Tiny Adventures Rental",
    city: "San Diego, CA",
    verified: true,
    rating: 5,
    responseTime: "Usually replies in 20 minutes",
    specialties: ["Adventure combos", "Obstacle inflatables", "Toddler zones"],
    about: "Bright, durable, and kid-friendly structures for birthdays, school fairs, and neighborhood celebrations.",
    accent: "from-amber-300 via-orange-400 to-red-400",
  },
];

export const toys: Toy[] = [
  {
    id: "castle-cloud",
    slug: "castle-cloud-bounce-house",
    name: "Castle Cloud Bounce House",
    category: "Bounce House",
    providerId: "sunshine-play",
    summary: "A dreamy pastel castle with a roomy jumping area and shaded entry ramp.",
    description:
      "The Castle Cloud Bounce House is perfect for birthdays that need a centerpiece. It combines a soft landing zone, mesh safety walls, and a generous play area that keeps kids active without feeling crowded.",
    pricePerDay: 380,
    rating: 4.9,
    reviewCount: 184,
    ageRange: "3-10 years",
    capacity: "Up to 12 children",
    location: "Austin metro area",
    featured: true,
    popular: true,
    highlights: ["Setup and pickup included", "Rain cover included", "Sanitized before every rental"],
    schedules: buildSchedules(
      ["2026-04-12", "2026-04-13", "2026-04-14"],
      [
        ["available", "limited", "sold_out"],
        ["limited", "available", "sold_out"],
        ["available", "available", "limited"],
      ]
    ),
    reviews: [
      {
        id: makeBookingId(),
        name: "Mia R.",
        rating: 5,
        comment: "Beautiful setup and the kids spent hours bouncing safely.",
        date: "2026-03-28",
      },
      {
        id: makeBookingId(),
        name: "Jordan K.",
        rating: 5,
        comment: "Fast communication and spotless equipment.",
        date: "2026-03-21",
      },
    ],
    accent: "from-sky-300 via-indigo-300 to-violet-400",
  },
  {
    id: "rainbow-pit",
    slug: "rainbow-ball-pit",
    name: "Rainbow Ball Pit",
    category: "Ball Pit",
    providerId: "bubble-bounce",
    summary: "A soft modular ball pit with pastel rails and a toddler-friendly entrance.",
    description:
      "The Rainbow Ball Pit is a hit for younger kids and indoor celebrations. It is compact, easy to position, and creates a playful corner that photographs beautifully.",
    pricePerDay: 250,
    rating: 4.8,
    reviewCount: 126,
    ageRange: "1-6 years",
    capacity: "Up to 8 children",
    location: "Orlando and nearby cities",
    featured: true,
    popular: true,
    highlights: ["Indoor-friendly footprint", "Soft foam walls", "Color-matched ball set"],
    schedules: buildSchedules(
      ["2026-04-12", "2026-04-15", "2026-04-16"],
      [
        ["limited", "available", "available"],
        ["available", "sold_out", "available"],
        ["available", "limited", "sold_out"],
      ]
    ),
    reviews: [
      {
        id: makeBookingId(),
        name: "Camila S.",
        rating: 5,
        comment: "Perfect for toddlers and the colors looked amazing in photos.",
        date: "2026-03-18",
      },
      {
        id: makeBookingId(),
        name: "Noah P.",
        rating: 4,
        comment: "Compact but very well designed.",
        date: "2026-03-15",
      },
    ],
    accent: "from-fuchsia-300 via-pink-300 to-rose-400",
  },
  {
    id: "jungle-slide",
    slug: "safari-slide-combo",
    name: "Safari Slide Combo",
    category: "Slide Combo",
    providerId: "tiny-adventures",
    summary: "A tall slide combo with climbing steps, splash colors, and safari accents.",
    description:
      "The Safari Slide Combo is built for higher-energy parties. Kids can climb, slide, and circle back for more, making it ideal for larger groups and outdoor events.",
    pricePerDay: 450,
    rating: 4.7,
    reviewCount: 96,
    ageRange: "4-12 years",
    capacity: "Up to 14 children",
    location: "San Diego metro area",
    featured: true,
    popular: false,
    highlights: ["Tall slide lane", "Double entry points", "Sturdy anchoring system"],
    schedules: buildSchedules(
      ["2026-04-13", "2026-04-14", "2026-04-17"],
      [
        ["available", "available", "limited"],
        ["limited", "sold_out", "available"],
        ["available", "available", "available"],
      ]
    ),
    reviews: [
      {
        id: makeBookingId(),
        name: "Ava L.",
        rating: 5,
        comment: "The slide combo was the highlight of the party.",
        date: "2026-03-25",
      },
      {
        id: makeBookingId(),
        name: "Leo T.",
        rating: 4,
        comment: "Great for a bigger birthday crowd.",
        date: "2026-03-20",
      },
    ],
    accent: "from-amber-300 via-orange-300 to-red-400",
  },
  {
    id: "mini-carnival",
    slug: "mini-carnival-experience",
    name: "Mini Carnival Experience",
    category: "Event Experience",
    providerId: "sunshine-play",
    summary: "A playful mix of soft obstacles, tunnels, and a mini game corner.",
    description:
      "This modular experience feels like a tiny carnival in your backyard. It works especially well when you want one rental to entertain kids across different ages.",
    pricePerDay: 520,
    rating: 4.9,
    reviewCount: 148,
    ageRange: "3-11 years",
    capacity: "Up to 16 children",
    location: "Austin metro area",
    featured: false,
    popular: true,
    highlights: ["Multi-zone play", "Great for mixed ages", "Setup crew included"],
    schedules: buildSchedules(
      ["2026-04-12", "2026-04-18", "2026-04-19"],
      [
        ["available", "limited", "sold_out"],
        ["available", "available", "limited"],
        ["sold_out", "available", "available"],
      ]
    ),
    reviews: [
      {
        id: makeBookingId(),
        name: "Sophie M.",
        rating: 5,
        comment: "It truly felt like a mini festival in our backyard.",
        date: "2026-03-30",
      },
      {
        id: makeBookingId(),
        name: "Ethan B.",
        rating: 5,
        comment: "Amazing for keeping a big group engaged.",
        date: "2026-03-24",
      },
    ],
    accent: "from-violet-300 via-indigo-300 to-cyan-300",
  },
  {
    id: "space-jump",
    slug: "space-jump-adventure",
    name: "Space Jump Adventure",
    category: "Bounce House",
    providerId: "bubble-bounce",
    summary: "A cosmic-themed bounce house with twinkling details and bold neon accents.",
    description:
      "Space Jump Adventure is designed for families who want something playful but slightly more energetic in appearance. It pairs bold graphics with a safe, roomy play surface.",
    pricePerDay: 410,
    rating: 4.8,
    reviewCount: 101,
    ageRange: "4-10 years",
    capacity: "Up to 10 children",
    location: "Orlando and nearby cities",
    featured: false,
    popular: true,
    highlights: ["Themed decor", "Night-party friendly colors", "Quick installation"],
    schedules: buildSchedules(
      ["2026-04-14", "2026-04-16", "2026-04-20"],
      [
        ["limited", "available", "available"],
        ["available", "sold_out", "limited"],
        ["available", "available", "sold_out"],
      ]
    ),
    reviews: [
      {
        id: makeBookingId(),
        name: "Grace D.",
        rating: 5,
        comment: "Our space theme was a huge hit.",
        date: "2026-03-22",
      },
      {
        id: makeBookingId(),
        name: "Owen H.",
        rating: 4,
        comment: "Beautiful, sturdy, and very easy to coordinate.",
        date: "2026-03-19",
      },
    ],
    accent: "from-cyan-300 via-sky-300 to-indigo-400",
  },
];

export const seedBookings: Booking[] = [
  {
    id: "VB-7QK9A",
    toyId: "castle-cloud",
    toySlug: "castle-cloud-bounce-house",
    toyName: "Castle Cloud Bounce House",
    providerName: "Sunshine Play Co.",
    category: "Bounce House",
    price: 380,
    date: "2026-04-12",
    dateLabel: formatDateLabel("2026-04-12"),
    slotId: "slot-1",
    slotLabel: "9:00 AM - 12:00 PM",
    childName: "Luna",
    childAge: "6",
    address: "Westlake, Austin",
    eventType: "Birthday",
    childrenCount: "12",
    notes: "Unicorn theme and pastel tableware.",
    buyerName: "Olivia Parker",
    buyerEmail: "olivia@example.com",
    buyerPhone: "+1 (512) 555-0199",
    cardLast4: "4242",
    status: "confirmed",
    createdAt: "2026-03-29T16:00:00Z",
  },
  {
    id: "VB-2RLM8",
    toyId: "rainbow-pit",
    toySlug: "rainbow-ball-pit",
    toyName: "Rainbow Ball Pit",
    providerName: "Bubble Bounce Studio",
    category: "Ball Pit",
    price: 250,
    date: "2026-04-15",
    dateLabel: formatDateLabel("2026-04-15"),
    slotId: "slot-2",
    slotLabel: "1:00 PM - 4:00 PM",
    childName: "Theo",
    childAge: "3",
    address: "Lake Nona, Orlando",
    eventType: "School",
    childrenCount: "18",
    notes: "Indoor setup at the community room.",
    buyerName: "Daniel Rivera",
    buyerEmail: "daniel@example.com",
    buyerPhone: "+1 (407) 555-0144",
    cardLast4: "9012",
    status: "pending",
    createdAt: "2026-04-01T11:25:00Z",
  },
  {
    id: "VB-9TY2C",
    toyId: "jungle-slide",
    toySlug: "safari-slide-combo",
    toyName: "Safari Slide Combo",
    providerName: "Tiny Adventures Rental",
    category: "Slide Combo",
    price: 450,
    date: "2026-04-14",
    dateLabel: formatDateLabel("2026-04-14"),
    slotId: "slot-2",
    slotLabel: "1:00 PM - 4:00 PM",
    childName: "Maya",
    childAge: "8",
    address: "La Jolla, San Diego",
    eventType: "Community",
    childrenCount: "20",
    notes: "Neighborhood spring celebration.",
    buyerName: "Priya Shah",
    buyerEmail: "priya@example.com",
    buyerPhone: "+1 (619) 555-0167",
    cardLast4: "1881",
    status: "canceled",
    createdAt: "2026-03-26T08:40:00Z",
  },
];

export const eventTypes = ["Birthday", "School", "Community", "Family", "Other"];

export const toyTypes = ["All types", ...Array.from(new Set(toys.map((toy) => toy.category)))];

export const priceRanges = [
  { label: "Any price", min: 0, max: 9999 },
  { label: "Under $300", min: 0, max: 300 },
  { label: "$300 - $450", min: 300, max: 450 },
  { label: "$450+", min: 450, max: 9999 },
];

export function getToyBySlug(slug: string) {
  return toys.find((toy) => toy.slug === slug);
}

export function getToyById(id: string) {
  return toys.find((toy) => toy.id === id);
}

export function getProviderById(id: string) {
  return providers.find((provider) => provider.id === id);
}

export function getToyAvailabilityLabel(toy: Toy, date?: string) {
  const targetSchedule = date ? toy.schedules.find((schedule) => schedule.date === date) : toy.schedules[0];
  const schedules = targetSchedule ? [targetSchedule] : toy.schedules;
  const flattened = schedules.flatMap((schedule) => schedule.slots);

  if (flattened.every((slot) => slot.status === "sold_out")) {
    return "Sold out";
  }

  if (flattened.some((slot) => slot.status === "limited")) {
    return "Few spots left";
  }

  return "Available";
}

export function getFirstBookableSlot(toy: Toy) {
  for (const schedule of toy.schedules) {
    const slot = schedule.slots.find((item) => item.status !== "sold_out");
    if (slot) {
      return { date: schedule.date, slotId: slot.id };
    }
  }

  const firstSchedule = toy.schedules[0];
  return firstSchedule ? { date: firstSchedule.date, slotId: firstSchedule.slots[0]?.id ?? "" } : null;
}
