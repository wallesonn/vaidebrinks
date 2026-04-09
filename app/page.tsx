import Link from "next/link";
import { ArrowRight, CalendarDays, Sparkles, Stars, Truck, ShieldCheck, BadgeCheck } from "lucide-react";
import { providers, toys } from "@/lib/mock-data";
import { ArtworkFrame, Badge, Button, Card, CardDescription, CardHeader, CardTitle, Rating, SectionHeader } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const featuredToys = toys.filter((toy) => toy.featured).slice(0, 3);
  const popularToys = toys.filter((toy) => toy.popular).slice(0, 4);

  return (
    <div className="space-y-14 pb-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8 rounded-[36px] border border-white/70 bg-hero-glow p-8 shadow-soft sm:p-10 lg:p-14">
          <Badge className="bg-indigo-50 text-indigo-700">Marketplace + reservas + clima de festa</Badge>
          <div className="max-w-2xl space-y-5">
            <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
              Encontre o brinquedo perfeito para a festa
              <span className="block text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text">
                e reserve em poucos minutos.
              </span>
            </h1>
            <p className="max-w-2xl text-balance text-lg leading-8 text-slate-600">
              Descubra castelos infláveis, piscinas de bolinhas e escorregadores com disponibilidade em tempo real,
              seleção de data e reservas no estilo de ingresso para festas infantis inesquecíveis.
            </p>
          </div>

          <div className="grid gap-3 rounded-[28px] border border-slate-200 bg-white p-3 shadow-soft sm:grid-cols-[1.15fr_1fr_0.8fr_auto]">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Data</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Qualquer fim de semana próximo</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Tipo de brinquedo</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Castelo inflável, escorregador ou piscina de bolinhas</p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Cidade</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">Seu bairro</p>
            </div>
            <Button href="/search" size="lg" className="w-full whitespace-nowrap">
              Começar a explorar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 text-sm text-slate-600">
            {[
              { icon: ShieldCheck, text: "Fornecedores verificados" },
              { icon: CalendarDays, text: "Disponibilidade por data" },
              { icon: Truck, text: "Entrega e montagem" },
              { icon: Sparkles, text: "Experiência premium e divertida" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                <Icon className="h-4 w-4 text-indigo-500" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <ArtworkFrame
          title="Uma jornada de checkout colorida para planejar festas"
          subtitle="Reservas no estilo ingresso"
          accent="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500"
        />
      </section>

      <section>
        <SectionHeader
          eyebrow="Fornecedores em destaque"
          title="Equipes confiáveis que deixam cada festa mais fácil"
          description="Explore parceiros com perfis verificados, notas altas e tempo de resposta ágil."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.id} className="overflow-hidden p-0">
              <div className={`h-28 bg-gradient-to-r ${provider.accent}`} />
              <div className="p-6">
                <CardHeader>
                  <div>
                    <CardTitle>{provider.name}</CardTitle>
                    <CardDescription>{provider.city}</CardDescription>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700">{provider.verified ? "Verificado" : "Parceiro"}</Badge>
                </CardHeader>
                <div className="space-y-4">
                  <Rating value={provider.rating} />
                  <p className="text-sm leading-6 text-slate-600">{provider.about}</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty) => (
                      <Badge key={specialty} className="bg-slate-100 text-slate-700">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Brinquedos em destaque"
          title="Locações selecionadas para festas marcantes"
          description="Cada card parece um destaque de evento, com preço claro, avaliação e identidade visual."
          action={<Button href="/search" variant="secondary">Ver todos os brinquedos</Button>}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredToys.map((toy) => (
            <Card key={toy.id} className="overflow-hidden p-0">
              <div className={`h-52 bg-gradient-to-br ${toy.accent} p-5 text-white`}>
                <div className="flex h-full flex-col justify-between rounded-[24px] border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                  <Badge className="w-fit bg-white/20 text-white">{toy.category}</Badge>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{toy.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-white/85">{toy.summary}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <Rating value={toy.rating} reviews={toy.reviewCount} />
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">A partir de</p>
                    <p className="text-xl font-black text-slate-900">{formatCurrency(toy.pricePerDay)}</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-600">{toy.location}</p>
                <Button href={`/toy/${toy.slug}`} variant="primary" className="w-full">Abrir detalhes</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="Mais populares da semana"
          title="As experiências mais reservadas no momento"
          description="Ótimo para pais que querem inspiração rápida, prova social e decisão imediata."
        />
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="bg-slate-950 text-white">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white/70">Relatório de tendência</p>
                <h3 className="mt-2 text-2xl font-black">Locações mais procuradas em abril</h3>
              </div>
              <Stars className="h-10 w-10 text-amber-300" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {popularToys.slice(0, 4).map((toy) => (
                <Link key={toy.id} href={`/toy/${toy.slug}`} className="rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white/70">{toy.category}</p>
                      <h4 className="mt-1 text-lg font-bold">{toy.name}</h4>
                    </div>
                    <Badge className="bg-emerald-500/15 text-emerald-200">{toy.popular ? "Quente" : "Novo"}</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/70">{toy.summary}</p>
                </Link>
              ))}
            </div>
          </Card>

          <div className="grid gap-5">
            <Card>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">★</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Reserva rápida</p>
                  <p className="text-sm text-slate-600">Reserve um horário como ingresso, com persistência de estado local.</p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">☀</div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Disponibilidade inteligente</p>
                  <p className="text-sm text-slate-600">Alguns horários podem estar esgotados, limitados ou disponíveis.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
