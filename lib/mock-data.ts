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
    responseTime: "Costuma responder em 10 minutos",
    specialties: ["Castelos infláveis", "Brincadeira suave", "Montagem de eventos"],
    about: "Uma equipe familiar que leva experiências coloridas e seguras para quintais e espaços comunitários.",
    accent: "from-sky-400 via-indigo-400 to-violet-500",
  },
  {
    id: "bubble-bounce",
    name: "Bubble Bounce Studio",
    city: "Orlando, FL",
    verified: true,
    rating: 4.8,
    responseTime: "Costuma responder em 15 minutos",
    specialties: ["Piscinas de bolinhas", "Escorregadores", "Estilo para festas"],
    about: "Conhecida por temas divertidos e equipamentos infláveis premium que são tão bonitos quanto funcionais.",
    accent: "from-fuchsia-400 via-pink-400 to-rose-500",
  },
  {
    id: "tiny-adventures",
    name: "Tiny Adventures Rental",
    city: "San Diego, CA",
    verified: true,
    rating: 5,
    responseTime: "Costuma responder em 20 minutos",
    specialties: ["Combos de aventura", "Infláveis com obstáculos", "Espaços para pequenos"],
    about: "Estruturas coloridas, duráveis e amigáveis para aniversários, feiras escolares e celebrações de bairro.",
    accent: "from-amber-300 via-orange-400 to-red-400",
  },
];

export const toys: Toy[] = [
  {
    id: "castle-cloud",
    slug: "castle-cloud-bounce-house",
    name: "Castelo Cloud Inflável",
    category: "Castelo Inflável",
    providerId: "sunshine-play",
    summary: "Um castelo em tons pastel com área ampla para saltos e rampa de entrada sombreada.",
    description:
      "O Castelo Cloud Inflável é perfeito para aniversários que precisam de uma atração principal. Ele combina uma área de aterrissagem macia, paredes de proteção em tela e um espaço generoso que mantém as crianças ativas sem aperto.",
    pricePerDay: 380,
    rating: 4.9,
    reviewCount: 184,
    ageRange: "3 a 10 anos",
    capacity: "Até 12 crianças",
    location: "Região metropolitana de Austin",
    featured: true,
    popular: true,
    highlights: ["Montagem e retirada incluídas", "Capa contra chuva incluída", "Higienizado antes de cada locação"],
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
        comment: "Montagem linda e as crianças passaram horas pulando com segurança.",
        date: "2026-03-28",
      },
      {
        id: makeBookingId(),
        name: "Jordan K.",
        rating: 5,
        comment: "Comunicação rápida e equipamento impecável.",
        date: "2026-03-21",
      },
    ],
    accent: "from-sky-300 via-indigo-300 to-violet-400",
  },
  {
    id: "rainbow-pit",
    slug: "rainbow-ball-pit",
    name: "Piscina de Bolinhas Arco-Íris",
    category: "Piscina de Bolinhas",
    providerId: "bubble-bounce",
    summary: "Uma piscina de bolinhas modular e macia, com bordas em tons pastel e entrada ideal para pequenos.",
    description:
      "A Piscina de Bolinhas Arco-Íris faz sucesso com crianças menores e comemorações em ambiente interno. É compacta, fácil de posicionar e cria um canto divertido que fica lindo nas fotos.",
    pricePerDay: 250,
    rating: 4.8,
    reviewCount: 126,
    ageRange: "1 a 6 anos",
    capacity: "Até 8 crianças",
    location: "Orlando e cidades próximas",
    featured: true,
    popular: true,
    highlights: ["Formato ideal para ambientes internos", "Paredes macias de espuma", "Conjunto de bolas combinando com o tema"],
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
        comment: "Perfeita para os pequenos e as cores ficaram incríveis nas fotos.",
        date: "2026-03-18",
      },
      {
        id: makeBookingId(),
        name: "Noah P.",
        rating: 4,
        comment: "Compacta, mas muito bem planejada.",
        date: "2026-03-15",
      },
    ],
    accent: "from-fuchsia-300 via-pink-300 to-rose-400",
  },
  {
    id: "jungle-slide",
    slug: "safari-slide-combo",
    name: "Combo de Escorregador Safari",
    category: "Combo de Escorregador",
    providerId: "tiny-adventures",
    summary: "Um combo alto com escorregador, degraus para escalar, cores vibrantes e detalhes de safari.",
    description:
      "O Combo de Escorregador Safari foi criado para festas mais agitadas. As crianças podem subir, escorregar e voltar para mais, o que o torna ideal para grupos maiores e eventos ao ar livre.",
    pricePerDay: 450,
    rating: 4.7,
    reviewCount: 96,
    ageRange: "4 a 12 anos",
    capacity: "Até 14 crianças",
    location: "Região metropolitana de San Diego",
    featured: true,
    popular: false,
    highlights: ["Escorregador alto", "Dois pontos de entrada", "Sistema de fixação robusto"],
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
        comment: "O combo de escorregador foi o ponto alto da festa.",
        date: "2026-03-25",
      },
      {
        id: makeBookingId(),
        name: "Leo T.",
        rating: 4,
        comment: "Ótimo para um aniversário com muita gente.",
        date: "2026-03-20",
      },
    ],
    accent: "from-amber-300 via-orange-300 to-red-400",
  },
  {
    id: "mini-carnival",
    slug: "mini-carnival-experience",
    name: "Experiência Mini Carnaval",
    category: "Experiência de Festa",
    providerId: "sunshine-play",
    summary: "Uma mistura divertida de obstáculos macios, túneis e um cantinho de jogos.",
    description:
      "Essa experiência modular parece um pequeno carnaval no seu quintal. Funciona especialmente bem quando você quer uma única locação para entreter crianças de várias idades.",
    pricePerDay: 520,
    rating: 4.9,
    reviewCount: 148,
    ageRange: "3 a 11 anos",
    capacity: "Até 16 crianças",
    location: "Região metropolitana de Austin",
    featured: false,
    popular: true,
    highlights: ["Brincadeira em várias áreas", "Ótimo para idades mistas", "Equipe de montagem incluída"],
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
        comment: "Parecia mesmo um mini festival no nosso quintal.",
        date: "2026-03-30",
      },
      {
        id: makeBookingId(),
        name: "Ethan B.",
        rating: 5,
        comment: "Perfeito para manter um grupo grande entretido.",
        date: "2026-03-24",
      },
    ],
    accent: "from-violet-300 via-indigo-300 to-cyan-300",
  },
  {
    id: "space-jump",
    slug: "space-jump-adventure",
    name: "Aventura Space Jump",
    category: "Castelo Inflável",
    providerId: "bubble-bounce",
    summary: "Um castelo inflável com tema espacial, detalhes brilhantes e acentos neon marcantes.",
    description:
      "A Aventura Space Jump foi pensada para famílias que querem algo divertido, mas com aparência um pouco mais energética. Ela combina gráficos marcantes com uma área de brincar ampla e segura.",
    pricePerDay: 410,
    rating: 4.8,
    reviewCount: 101,
    ageRange: "4 a 10 anos",
    capacity: "Até 10 crianças",
    location: "Orlando e cidades próximas",
    featured: false,
    popular: true,
    highlights: ["Decoração temática", "Cores ideais para festas noturnas", "Instalação rápida"],
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
        comment: "Nosso tema espacial fez muito sucesso.",
        date: "2026-03-22",
      },
      {
        id: makeBookingId(),
        name: "Owen H.",
        rating: 4,
        comment: "Lindo, resistente e muito fácil de organizar.",
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
    toyName: "Castelo Cloud Inflável",
    providerName: "Sunshine Play Co.",
    category: "Castelo Inflável",
    price: 380,
    date: "2026-04-12",
    dateLabel: formatDateLabel("2026-04-12"),
    slotId: "slot-1",
    slotLabel: "9:00 - 12:00",
    childName: "Luna",
    childAge: "6",
    address: "Westlake, Austin",
    eventType: "Aniversário",
    childrenCount: "12",
    notes: "Tema de unicórnio e louças em tons pastel.",
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
    toyName: "Piscina de Bolinhas Arco-Íris",
    providerName: "Bubble Bounce Studio",
    category: "Piscina de Bolinhas",
    price: 250,
    date: "2026-04-15",
    dateLabel: formatDateLabel("2026-04-15"),
    slotId: "slot-2",
    slotLabel: "13:00 - 16:00",
    childName: "Theo",
    childAge: "3",
    address: "Lake Nona, Orlando",
    eventType: "Escola",
    childrenCount: "18",
    notes: "Montagem interna na sala da comunidade.",
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
    toyName: "Combo de Escorregador Safari",
    providerName: "Tiny Adventures Rental",
    category: "Combo de Escorregador",
    price: 450,
    date: "2026-04-14",
    dateLabel: formatDateLabel("2026-04-14"),
    slotId: "slot-2",
    slotLabel: "13:00 - 16:00",
    childName: "Maya",
    childAge: "8",
    address: "La Jolla, San Diego",
    eventType: "Comunidade",
    childrenCount: "20",
    notes: "Celebração de primavera do bairro.",
    buyerName: "Priya Shah",
    buyerEmail: "priya@example.com",
    buyerPhone: "+1 (619) 555-0167",
    cardLast4: "1881",
    status: "canceled",
    createdAt: "2026-03-26T08:40:00Z",
  },
];

export const eventTypes = ["Aniversário", "Escola", "Comunidade", "Família", "Outro"];

export const toyTypes = ["Todos os tipos", ...Array.from(new Set(toys.map((toy) => toy.category)))];

export const priceRanges = [
  { label: "Qualquer preço", min: 0, max: 9999 },
  { label: "Até R$ 300", min: 0, max: 300 },
  { label: "R$ 300 - R$ 450", min: 300, max: 450 },
  { label: "Acima de R$ 450", min: 450, max: 9999 },
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
    return "Esgotado";
  }

  if (flattened.some((slot) => slot.status === "limited")) {
    return "Poucas vagas";
  }

  return "Disponível";
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
