import type { Booking, Provider, SchoolEvent, Toy, User } from "@/lib/types";
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

  return null;
}

export const mockUsers: User[] = [
  { id: "pai-1", name: "Olivia Santos", email: "olivia@email.com", role: "pai", city: "São Paulo", avatarInitials: "OS" },
  { id: "pai-2", name: "Carlos Mendes", email: "carlos@email.com", role: "pai", city: "Rio de Janeiro", avatarInitials: "CM" },
  { id: "pai-3", name: "Priya Shah", email: "priya@email.com", role: "pai", city: "Curitiba", avatarInitials: "PS" },
  { id: "emp-1", name: "Sunshine Play Co.", email: "contato@sunshineplay.com", role: "empresa", city: "Austin", avatarInitials: "SP" },
  { id: "emp-2", name: "Bubble Bounce Studio", email: "contato@bubblebounce.com", role: "empresa", city: "Orlando", avatarInitials: "BB" },
  { id: "emp-3", name: "Tiny Adventures Rental", email: "contato@tinyadventures.com", role: "empresa", city: "San Diego", avatarInitials: "TA" },
];

export const mockSchoolEvents: SchoolEvent[] = [
  {
    id: "evt-1",
    title: "Festa da Primavera",
    school: "Escola Municipal Jardim das Flores",
    city: "São Paulo",
    date: "2026-09-22",
    time: "09:00 - 13:00",
    description: "Celebração anual da primavera com atividades ao ar livre, gincanas, músicas e brinquedos infláveis. Venha fantasiado!",
    category: "Festa Temática",
    ageRange: "4 a 10 anos",
    capacity: 120,
    enrolled: 87,
    status: "aberto",
    organizer: "Diretoria Pedagógica",
    address: "Av. das Flores, 340 - Jardim Paulista, São Paulo",
    free: true,
  },
  {
    id: "evt-2",
    title: "Olimpíadas Escolares 2026",
    school: "Colégio Estadual Rio Verde",
    city: "Rio de Janeiro",
    date: "2026-05-15",
    time: "08:00 - 17:00",
    description: "Competições esportivas entre turmas com atividades recreativas, tobogãs e arena inflável. Torcida liberada!",
    category: "Evento Esportivo",
    ageRange: "6 a 14 anos",
    capacity: 200,
    enrolled: 200,
    status: "encerrado",
    organizer: "Coordenação de Esportes",
    address: "Rua das Laranjeiras, 890 - Laranjeiras, Rio de Janeiro",
    free: true,
  },
  {
    id: "evt-3",
    title: "Semana da Criança",
    school: "Escola Infantil Pequenos Gênios",
    city: "Curitiba",
    date: "2026-10-10",
    time: "10:00 - 15:00",
    description: "Uma semana dedicada às crianças com estações de brincadeiras, piscina de bolinhas, castelo inflável e muita diversão!",
    category: "Semana Temática",
    ageRange: "2 a 8 anos",
    capacity: 80,
    enrolled: 43,
    status: "aberto",
    organizer: "Grêmio de Pais e Mestres",
    address: "Rua Bom Jesus, 220 - Bairro Alto, Curitiba",
    free: false,
    price: 15,
  },
  {
    id: "evt-4",
    title: "Gincana da Amizade",
    school: "Escola Particular Arco-Íris",
    city: "São Paulo",
    date: "2026-06-20",
    time: "09:00 - 12:00",
    description: "Gincana interativa com equipes mistas, brincadeiras de equipe, circuito de obstáculos e premiação de participação.",
    category: "Gincana",
    ageRange: "5 a 12 anos",
    capacity: 150,
    enrolled: 110,
    status: "aberto",
    organizer: "Professores Coordenadores",
    address: "Alameda Santos, 1200 - Jardins, São Paulo",
    free: true,
  },
  {
    id: "evt-5",
    title: "Festa Junina 2026",
    school: "EMEF Dom Pedro II",
    city: "Belo Horizonte",
    date: "2026-06-13",
    time: "14:00 - 20:00",
    description: "A tradicional festa junina com quadrilha, comidas típicas, brincadeiras, tobogã e muito forró!",
    category: "Festa Junina",
    ageRange: "Todas as idades",
    capacity: 300,
    enrolled: 210,
    status: "aberto",
    organizer: "Associação de Pais e Mestres",
    address: "Rua dos Carijós, 450 - Centro, Belo Horizonte",
    free: false,
    price: 10,
  },
  {
    id: "evt-6",
    title: "Feira de Ciências",
    school: "Instituto Técnico Santa Cruz",
    city: "Curitiba",
    date: "2026-08-28",
    time: "13:00 - 18:00",
    description: "Exposição de projetos científicos com espaço recreativo para as crianças menores, escorregador temático e área de experimentos.",
    category: "Feira Científica",
    ageRange: "8 a 17 anos",
    capacity: 180,
    enrolled: 55,
    status: "em_breve",
    organizer: "Departamento de Ciências",
    address: "Av. Sete de Setembro, 3600 - Rebouças, Curitiba",
    free: true,
  },
  {
    id: "evt-7",
    title: "Dia das Crianças Especial",
    school: "Centro Educacional Novo Horizonte",
    city: "Rio de Janeiro",
    date: "2026-10-12",
    time: "09:00 - 14:00",
    description: "Celebração do Dia das Crianças com castelo inflável, piscina de bolinhas, combo de escorregador e muita animação!",
    category: "Festa Temática",
    ageRange: "3 a 11 anos",
    capacity: 100,
    enrolled: 34,
    status: "em_breve",
    organizer: "Equipe Pedagógica",
    address: "Rua da Passagem, 179 - Botafogo, Rio de Janeiro",
    free: true,
  },
  {
    id: "evt-8",
    title: "Recreio Solidário",
    school: "Escola Municipal Esperança",
    city: "Belo Horizonte",
    date: "2026-04-25",
    time: "08:00 - 11:00",
    description: "Evento recreativo com arrecadação de brinquedos usados. Trazer um brinquedo e participar das atividades com piscina de bolinhas e tobogã.",
    category: "Evento Solidário",
    ageRange: "4 a 12 anos",
    capacity: 90,
    enrolled: 90,
    status: "encerrado",
    organizer: "Conselho Escolar",
    address: "Rua Padre Eustáquio, 880 - Padre Eustáquio, Belo Horizonte",
    free: true,
  },
];

export const eventCities = ["Todas as cidades", ...Array.from(new Set(mockSchoolEvents.map((e) => e.city)))];

export const eventCategories = ["Todas as categorias", ...Array.from(new Set(mockSchoolEvents.map((e) => e.category)))];

export function getSchoolEventsByCity(city: string) {
  if (!city || city === "Todas as cidades") return mockSchoolEvents;
  return mockSchoolEvents.filter((e) => e.city === city);
}
